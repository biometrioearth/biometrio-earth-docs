---
sidebar_position: 2
---

# How to query?

You can query the models in balam using search by id or unique fields to filter the data for a single 
entry or you can widen the search to retrieve a list of items in a model using the _all_ queries. 

## Single item queries

You can make single item queries if you know the id of the object to retrieve. But also some models 
have a unique field that you can use to search for them. In the next example I use the Project model
to retrieve the "xprize" project by its id:

```graphql
{
  project(
    id: "799da30e-96eb-4367-bab1-1d0421ad360c"
  ) {
    shortname
  }
}
```

which returns

```graphql
{
  "data": {
    "project": {
      "shortname": "xprize"
    }
  }
}
```

but this query can also be made with the shortname, if you don't know the id of the object:

```graphql
{
  project(
    shortname: "xprize"
  ) {
    id
  }
}
```
this returns

```graphql
{
  "data": {
    "project": {
      "id": "799da30e-96eb-4367-bab1-1d0421ad360c"
    }
  }
}
```

not all models have a unique field, so this kind of search cannot be made with all models, but you can
make single item queries by id with all models.

## List queries

In Balam, the list queries are identified by the _all_ prefix. To use this type of queries is actually
pretty simple:

```graphql
{
  allProjects {
    items {
      id
      shortname
    }
  }
}
```

in the query above we are retrieving all the projects. The common fields in the _all_ queries are **items** and **pageInfo**. The **items** field holds the list of all objects in the model, and its fields are the fields of the model. The **pageInfo** field, is a special field to give info about the pagination. 

:::note 
All list queries are paginated and by default the max number of items in the response is **10**.
:::

You can have more info about the pagination with the **pageInfo** field:

```graphql
{
  allProjects {
    pageInfo {
      totalCount
      totalPages
      hasNextPage
      hasPrevPage
      pageSize
      currentPage
    }
    items {
      id
      shortname
    }
  }
}
```

this query returns:

```graphql
{
  "data": {
    "allProjects": {
      "pageInfo": {
        "totalCount": 5,
        "totalPages": 1,
        "hasNextPage": false,
        "hasPrevPage": false,
        "pageSize": 10,
        "currentPage": 1
      },
      "items": [
        {
          "id": "977b524a-279e-44f5-96b3-7aa26ga6udc8",
          "shortname": "test 1"
        },
        {
          "id": "9292eed8-5535-4242-91a5-1b72e546ycb7",
          "shortname": "test 2"
        },
        {
          "id": "1a58618f-2a8d-484b-a7d3-57b71c5f56a5",
          "shortname": "test 3"
        },
        {
          "id": "a500a996-35dd-4fce-a43f-424c41e334a9",
          "shortname": "test 4"
        },
        {
          "id": "799da30e-96eb-4367-bab1-1d0421ad360c",
          "shortname": "xprize"
        }
      ]
    }
  }
}
```

you can see in the response that the total items in the model are 5 in the _totalCount_ field, 
which that makes only 1 page, that's why the _totalPages_ fields returns only 1 (remember that 
default max items per page are 10). Because is the first page and we don't have any more pages
the _hasNextPage_ and _hasPrevPage_ returns **false**. The _pageSize_ is set to **10**, which is 
the default, and the _currentPage_ is 1.

### Pagination

There are two special arguments for handling the pagination. One is _pageSize_ and the other is 
_page_. As the names suggest, _pageSize_ changes the number of items retreived in each page, and 
as we said before, the default is set to 10, but you can increment or decrease that number to fit
your needs. On the other hand, _page_ sets the number of the page we want to retrieve, the default
value is 1. So, if this arguments are not in the query, the default is to return the first 10 items
in the first page.

An example of use for these arguments is when one wants to query all sampling points but wants to 
list 15 items per page. You can achieve thie by setting the _pageSize_ in the query like so:

```graphql
{
  allSamplingPoints(
    pageSize: 15
  ) {
    pageInfo {
      totalCount
      totalPages
      hasNextPage
      hasPrevPage
      pageSize
      currentPage
    }
    items {
      dateDeployment
    }
  }
}
```

and this returns:

```graphql
{
  "data": {
    "allSamplingPoints": {
      "pageInfo": {
        "totalCount": 2135,
        "totalPages": 143,
        "hasNextPage": true,
        "hasPrevPage": false,
        "pageSize": 15,
        "currentPage": 1
      },
      "items": [
        {
          "dateDeployment": "2023-03-12T00:00:00+00:00"
        },
        {
          "dateDeployment": "2023-03-12T00:00:00+00:00"
        },
        ...
      ]
    }
  }
}
```

you can see now the _pageSize_ is set to 15, and that's what the reponse says too. Also, the 
_hasNextPage_ field now returns **true**, because the _totalCount_ is bigger (we have more items
in this model). We can change the _currentPage_ by setting the _page_ argument in the query:

```graphql
{
  allSamplingPoints(
    pageSize: 15
    page: 3
  ) {
    pageInfo {
      totalCount
      totalPages
      hasNextPage
      hasPrevPage
      pageSize
      currentPage
    }
    items {
      dateDeployment
    }
  }
}
```