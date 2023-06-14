---
sidebar_position: 4
---

# Filter with related models

Because some models in _Balam_ are related to other models, you may want to filter a list of objects
by a certain value in its related model. You can do this type of filter in _Balam_ API with the 
arguments _relatedField_ and _related_.

For example, suppose that I want a list of all the _Sites_, so I write a query like this:

```query
{
  allSites {
    pageInfo {
      totalCount
    }
    items {
      identifier
    }
  }
}
```

which returns 

```graphql
{
  "data": {
    "allSites": {
      "pageInfo": {
        "totalCount": 101
      },
      "items": [
        ...
      ]
    }
  }
}
```

but now, I want to retrieve all the _sites_ that has _sampling points_ which its _identifier_
field is not _null_. So I modify the query and add the argument _filters_ but instead of the usual
arguments I use the _relatedField_ and _related_ arguments like this:

```graphql
{
  allSites(
    filters: {
      related: samplingpoint
      relatedField: "identifier"
      value: null
      operator: neq
    }
  ) {
    pageInfo {
      totalCount
    }
    items {
      identifier
    }
  }
}
```

and now this returns:

```graphql
{
  "data": {
    "allSites": {
      "pageInfo": {
        "totalCount": 4
      },
      "items": [
        ...
      ]
    }
  }
}
```

so there are only 4 _sites_ in the database which has at least 1 _sampling point_ with a not _null_ 
value in the _identifier_ field.

So the _related_ argument refers to the related model, in the example before _related_ points to the **Sampling Point** model, that is related to the **Site** model. And the _relatedField_ refers to the field in the related model in which we want to apply the search.

:::caution
You cannot mix the _related_ and _relatedField_ with _field_. If you want to apply a filter using a
related model you should only use _related_ and _relatedField_, and if you want to apply a simple
filter using a field in the model only use _field_. Mixing this arguments can lead to an error.
:::

You can also filter the list of objects in the model whit this related filter and the simple filter
using the AND/OR operators:

```graphql
{
  allSites(
    filters: {
      operator: AND
      filters: [
        {
          related: samplingpoint
          relatedField: "identifier"
          value: null
          operator: neq
        },
        {
          field: identifier
          value: "S",
          operator: contains
        }
      ]
    }
  ) {
    pageInfo {
      totalCount
    }
    items {
      identifier
    }
  }
}
```

now this new query returns:

```graphql
{
  "data": {
    "allSites": {
      "pageInfo": {
        "totalCount": 2
      },
      "items": [
        ...
      ]
    }
  }
}
```

so now we are filtering the objects check if at least one _sampling point_ related to the site has a 
not _null_ value in its _identifier_ field **and** also we are filtering the list checking if the 
_identifier_ field of the _site_ contains an "S".

:::info
The **contains** and **notContains** operators are case insensitive, keep in mind that when
making your queries.
:::