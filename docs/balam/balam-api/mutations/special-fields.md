---
sidebar_position: 2
---

# Special fields

When updating or creating you may encounter some errors in specific fields in certain models. That's 
because some fields have custom scalars due to not being defined by default in the graphql schema or
because it was easier to defined a custom scalar for the to have a better syntax when writing the query.


## JSON scalar

TODO

## Date scalar

TODO

## GIS scalars

At the moment we only use **two** GIS scalars in the Balam models, and those are **Polygon** and **Point**. Both share almost the same syntax, but differ in the coordinates property of the _geojson_.
The generic syntax of the _geojson_ for the GIS scalars is the next one:

```json
{
    "type": "Point", // or Polygon
    "coordinates": [
        ...
    ]
}
```

to use it in a query you can write:

```graphql
mutation {
	createSite(
    identifier: "site 1"
    geometry: {
      type: "Polygon",
      coordinates: [
        ...
      ]
    }
  ) {
    id
  }
}
```

the coordinates in the _Point_ and _Polygon_ change because for points we only need the _latitude_ and
_longitude_, and for polygons we need more information.

### Point

This GIS scalar is the most simple one, because we only require the _latitude_ and _longitude_. Ypu can 
see an example of the syntax for this scalar in the next mutation:

```graphql
mutation {
	createSamplingPoint(
    identifier: "point 1"
    location: {
      type: "Point",
      coordinates: [
        100.799722222222,
        1.03805555555555
      ]
    }
  ) {
    id
  }
}
```

keep in mind that the first element of the _coordinates_ array is the **longitude** and the second one 
is the **latitude**.  

### Polygon

A Polygon is a GIS object that stores a series of x and y coordinate pairs that enclose an area. So using
this knowledge and the examples before a Polygon scalar is written like this:

```graphql
mutation {
	createSite(
    identifier: "site 1"
    location: {
      type: "Polygon",
      coordinates: [
        [
            [
              -102.43244757476604,
              26.19399923194422
            ],
            [
              -102.43244757476604,
              24.29590720167262
            ],
            [
              -100.09089358417015,
              24.29590720167262
            ],
            [
              -100.09089358417015,
              26.19399923194422
            ],
            [
              -102.43244757476604,
              26.19399923194422
            ]
          ]
      ]
    }
  ) {
    id
  }
}
```

:::caution
Do not forget that the coordinates of the Polygon are inside of a nested array and the first and last 
coordinate is the same, this to close the polygon. So the array should look like:

```text
coordinates: [
    [
        [coordinates array point 1],
        ...
        [coordinates array point 1]
    ]
]
```
:::

and as with the Point scalar, the first element of each coordinate pair represents the longitude and the 
second one the latitude.

## Mutation Examples

TODO