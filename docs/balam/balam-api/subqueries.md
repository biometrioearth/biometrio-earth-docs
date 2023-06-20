---
sidebar_position: 6
---

# Subqueries

In GraphQL, subqueries refer to the ability to nest multiple queries within a single query, allowing you to retrieve related data in a hierarchical structure. By nesting queries, you can request specific fields on related objects and retrieve all the required data in a more efficient and organized manner.

All the models in balam have at least one relation with another model, so you can subquery the related model when querying a model. Because the related objects can be many (in a _OneToMany_ or a _ManyToMany_ relation) it is needed that the subquery is paginated. So all subqueries in balam API have pagination and
also you can use the other useful arguments of the listing queries like __sort__ and __filter__.

:::note
Search argument is not included in the subqueries arguments. This is a special argument only present in
que listing queries to make a quick search.
:::

You can use this arguments and pagination just the same as with the parent query:

```graphql
{
  allProjects {
    items {
      shortname
      siteSet(page: 2, pageSize:4) {
        items {
          identifier
        }
      }
      samplingpointSet(filters: {
        value: "11/10/2022 00:00:00",
        field: date_deployment
        operator: gt
        valueType: DateTime
      }) {
        items {
          id
        }
      }
      
    }
  }
}
```

in the query above we change the pagination by setting the _pageSize_ to 4, so we will only get 4 sites per page, this for the subquery `siteSet` which retrieve the sites related to the project. We also change the page to second one using the _page_ argument. In the other subquery example we use the __filter__ argument to filter the list of related _Sampling Points_ by all values grater than the date `11/10/2022 00:00:00` in the `date_deployment` field. The complete list of arguments that you can use in a subquery are:

- filters
- sort
- page
- pageSize