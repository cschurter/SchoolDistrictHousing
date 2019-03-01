#code from https://github.com/mswerli/zillow_data
import requests
import pandas as pd
from xml.etree import ElementTree
import xmltodict
from bs4 import BeautifulSoup
import numpy as np
import urllib
import utils
import datetime
import csv
import os.path
#os.path.isfile(fname)

##User specific ID used for IDing requests
zws_id = 'X1-ZWz183nrq3tjwr_a9fju'
##Address of property##
address = '870 avenida abeja'
##This one is intuitive
citystatezip = 'San Marcos,CA,92069'
##Zillow ID for property. Get from URL in browswer
zpid = '63141450'
##How any results
count = '25'
school='Canyon Crest Academy'

##Identifying info to base search on##
search_params = {'zws_id': zws_id, 'address': address,
                'citystatezip': citystatezip,
                'zpid': zpid, 'count': count}

##Tags to extract from respons##
search_tags = (('address'),
                ('zestimate','valuationRange','high'),
                ('zestimate','valuationRange','low'),
                ('zestimate', 'amount'))

comp_tags =  (('address'),
              ('zestimate','valuationRange','high'),
              ('zestimate','valuationRange','low'),
              ('zestimate', 'amount'))

##Colums for data##
home_cols = ['street', 'zipcode', 'city', 'state',
             'latitude', 'longitude', 'currency1',
             'valuation_high',  'currency2', 'valuation_low',
             'currency3' ,'zestimate', 'zpid']

comp_cols = ['city', 'latitude', 'longitude', 'state',
             'street', 'zipcode',  'valuation_high',
             'currency1', 'valuation_low', 'currency2',
             'zestimate', 'currency3', 'zpid']


##Get starting home data##
r = utils.get_response(api = 'search', params = search_params)

home = utils.parse_response(response = r,
                            api = 'search',
                            tags = search_tags,
                            cols = home_cols)


##Get Comps for original property
comp_response = utils.get_response(api = 'comp', params = search_params)

comps = utils.parse_response(response = comp_response,
                             api = 'comp',
                             tags = comp_tags,
                             cols = comp_cols)

##Combine data and write to csv
home = home[comp_cols]

data_list = [home,comps]
all_data = pd.concat(data_list)
all_data['record_date'] = datetime.datetime.now()
# path = 'comps.csv'
# all_data.to_csv(path)

#all_data.to_csv(path)
details_list = []
for i, row in all_data.iterrows():
    #print (row.zpid)
    search_params = {
        "zpid": row.zpid,
        "zws_id": zws_id
    }
    
    r = utils.get_response(api = 'propertyDetails', params = search_params)
    
    details = utils.parse_response(response = r,
                             api = 'propertyDetails',
                             tags = comp_tags,
                             cols = comp_cols)
    details['school'] = school
    #print(details)
    details_list.append(details)
comps_df = pd.DataFrame(details_list)
print(comps_df)
comps_df.to_csv("datasets/testschoolcomps/" + school + ".csv")

all_data.keys()

if os.path.isfile(path):
    ##check for exising file
    existing_data = pd.read_csv(path)
    existing_data = existing_data.drop('Unnamed: 0', axis = 1)
    data_list = [all_data, existing_data]

    all_data = pd.concat(data_list, sort = 'FALSE')

all_data.to_csv(path)