import json

clean = []

with open('raw-montreal-north.json') as json_file:
    data = json.load(json_file)
    count = 4000
    for i in data['results']:
        dict = {}
        count += 1
        dict['id'] = count
        dict['type'] = 'grocery'
        dict['name'] = i['name']
        dict['latitude'] = i['geometry']['location']['lat']
        dict['longitude'] = i['geometry']['location']['lng']
        clean.append(dict)
        print(i)
        print(count)

with open('clean-montreal-north.json', 'w') as fp:
    json.dump(clean, fp, indent=4, ensure_ascii=False)


if __name__ == "__main__":
    pass