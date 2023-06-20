---
sidebar_position: 8
---

# Special queries

Apart from the __Single item queries__ and the __List queries__ in Balam we also have some special queries that help to retrieve information from the Balam DB more easily without having to subquery other models or having to make multiple requests. The list of this special queries is continously growing depending on the needs of the team and the people consulting the Balam API.

## Find nearest Sampling Point

This query finds the nearest _sampling point_  to a coordinate pair, it takes two required arguments:

- latitude: Float
- longitude: Float

and 5 optional:

- projectId: ID
- projectHash: String
- projectShortname: String
- deviceId: ID
- deviceSerial: String

from these optional arguments you need to input at least one of them for the query to work. If you already entered the _projectId_ you don't need to provide the _projectHash_ neither the _projectShortname_, you only need one of those three to narrow the search by the related project. The same goes for the __device__, if you entered the _deviceId_, then you won't need to also enter the _deviceSerial_.

If you only entered the project (id, shortname or hash) the the search for the nearest sampling point would be shortened to the list of all the sampling points related to that project. If you also enter the device info the search would again be shortened, and that would make the search even quicker.

An example of use for this query is the following:

```graphql
{
  findNearestSamplingPoint(
    latitude: 19.456760107980628,
    longitude: -104.27485923132272,
    projectShortname: "projectexample",
    deviceSerial: "10305868"
  ) {
    id
    location
  }
}
```

and that returns

```graphql
{
  "data": {
    "findNearestSamplingPoint": {
      "id": "2c6f6556-22a1-4eb8-b627-6a093ad4d9d9",
      "location": {
        "type": "Point",
        "coordinates": [
          -104.2649853,
          19.4476061
        ]
      }
    }
  }
}
```

## Get project devices

This one is a pretty simple and straightforwad query, it returns a list of all the different types of devices registered to a project. It takes only one of this three arguments:

```graphql
id: ID # the project id
shortname: String # the project shortname
projectHash: String # the project hash
``` 

you can use it like this

```graphql
{
  getProjectDevices(
    shortname: "projectexample"
  ) {
    brand
    deviceType
  }
}
```

and this query only returns a list with two fields: _brand_ and _deviceType_ 

```graphql
{
  "data": {
    "getProjectDevices": [
      {
        "brand": "Camera brand",
        "deviceType": "camera"
      },
      {
        "brand": "Recorder brand",
        "deviceType": "recorder"
      }
    ]
  }
}
```