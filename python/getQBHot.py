# -*- coding:utf-8 -*-
from urllib import request
from urllib import error

import re

page = 1
url = 'http://www.qiushibaike.com/hot/page/' + str(page)
user_agent = 'Mozilla/4.0 (compatible; MSIE 5.5; Windows NT)'
headers = { 'User-Agent' : user_agent }
try:
    rq = request.Request(url,headers = headers)
    response = request.urlopen(rq)
    content = response.read().decode('utf-8').strip()
    pattern = re.compile('<div.*? class="author.*?">.*?<a.*?<h2.*?>(.*?)</h2>.*?</a>.*?<div.*?'+
                         'content">.*?<span>(.*?)</span>.*?<!--(.*?)-->.*?<div class="stats.*?class="number">(.*?)></i>',re.S)
    
    items = re.findall(pattern,content)
    for item in items:
        haveImg = re.search("img",item[1])
        if not haveImg:
            print(item[1])

    

except error.URLError as e:
    if hasattr(e,"code"):
        print(e.code)
    if hasattr(e,"reason"):
        print(e.reason)