---
sidebar_position: 3
---

# Sort query results

You can sort the result of the _all_ queries using the argument **sort**. This arguments takes a list
of order - field pairs:

```graphql
{
    order: ASC # or DESC
    field: # any field in the model
}
```

you can sort by multiple fields using the sort argument. The syntax to use this argument is as follows:

```graphql
{
  allFiles(
    sort: [
      {
        order: ASC,
        field: name
      }
    ]
  ) {
    items {
      name
    }
  }
}
```

this query will return a list of files sorted by __name__ in ascending order. Now suppose that we also want to sort by date of creation in descending order, the query would change to

```graphql
{
  allFiles(
    sort: [
      {
        order: ASC,
        field: name
      },
      {
        order: DESC,
        field: created_at
      }
    ]
  ) {
    items {
      name
    }
  }
} 
```

You can add every field of the model in the sort argument to sort you list results, keep in mind that the first arguments in the list have high priority on sorting.