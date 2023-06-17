---
sidebar_position: 4
---

# Search and filter

You can make a quick search in certain models in _Balam_, and in all models you can filter using
the argument _filters_ in the _all_ queries. The _search_ argument is actually more specific to each
model, and you cannot be used in all models. It may be available, but it won't filter the search by
the string you entered, so use it with caution.

## Search

The _search_ argument performs a simple search in predefined fields that are normally used to identify
an item in the list of items. For example the unique fields like username in the User model or the name
field in the File model. Here's an example of how to use it:

```graphql
{
  allFiles(search: "jpg") {
    pageInfo {
      totalCount
    }
    items {
      id
      url
      name
      fileMetadata
      createdAt
    }
  }
}
```

and this returns the list of items that contains `jpg` in the `name` field:

```graphql
{
  "data": {
    "allFiles": {
      "pageInfo": {
        "totalCount": 34
      },
      "items": [
        {
          "name": "image-1.jpg"
        },
        {
          "name": "image-2.jpg"
        },
        ...
      ]
    }
  }
}
```
:::info
The search is done in specific fields for each model, so to know in which field the search is
performed, you can check the documentation for each model in the [Balam - Apps and Models](/docs/category/balam---apps-and-models) section.
:::

## Filter

The _filters_ argument is a more special one and helps to make a more complex search. The _filters_ 
argument can take 4 arguments itself to apply a filter, which are:

- **field**:  is the field in the model where to apply the filter.
- **operator**: specifies the filter operator, and can be any of eq, neq, gt, gte, lt, lte, contains, notContains, OR, AND.
- **valueType**(optional): sets the conversion of the value to the specified type. If not set, takes the value as is was written.
- **value**: the value to filter with.

An example of how to use it is the next one:

```graphql
{
  allGroups(filters: {
    field: name,
    value: "annotators",
    operator: eq
  }) {
    items {
      id
      name
    }
  }
}
```

Here we are filtering the results that are an exact match with the value _annotators_ in the field name of the model **Group**. The _valueType_ argument can be omitted if the value is a string.

We can also make a more complex filter using `AND`/`OR` operators like so:

```graphql
{
  allUsers(filters: {
    operator: AND,
      filters: [
        {
          field: can_login,
          valueType: Boolean,
          value: "true",
          operator: eq
        },
        {
          field: email,
          value: "biometrio.earth",
          operator: contains
        }
     ]
  }) {
    items {
      username
      firstName
      email
    }
  }
}
```

Here we filter all users which the can_login field are setted to True and its email contains "biometrio.earth".

If we want to filter for items that its value is set to null in a field, we must omit the _valueType_ argument:

```graphql
{
  allFiles(filters: {
    field: file_metadata,
    operator: eq,
    value: null
  }) {
    items {
      id
      fileMetadata
    }
  }
}
```

this query only retrieves the files that doesn't have metadata.

Because some _Balam_ models have a JSON field, you can also make a search inside these fields, though the value of the filter needs to have a certain syntax in order to work properly. The next example shows how to do it:

```graphql
{
  allFiles(filters: {
    field: file_metadata,
    operator: gt,
    value: "Duration:60"
  }) {
    items {
      id
      name
      fileMetadata
    }
  }
}
```

Here the field _file_metadata_ is of type JSONField, and in its properties it has a key called 
_Duration_, so we are filtering all the files that have the key _Duration_ in their JSON field
and that have a value in that property grater than 60.