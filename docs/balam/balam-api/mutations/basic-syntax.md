---
sidebar_position: 1
---

# Basic Syntax

Mutations in balam hold a standard syntax. All mutations begin with create, update and delete prefix 
given the operation that the user wants to perform. The following are examples of the three operations:

```graphql title=Create
mutation {
	createProject(
    title: "test project",
    shortname: "test1"
  ) {
    id
  }
}
```
:::tip
Check what fields are required for each mutation, sometimes some fields are required in the create
mutation, but not in the update mutation. To know what fields are required you can check the docs in
the graphiql interface or in the [Balam - Apps and Models](/docs/category/balam---apps-and-models) section.
:::

```graphql title=Update
mutation {
	updateProject(
    id: "799da30e-96eb-4367-bab1-1d0421ad360c",
    country: "MX"
  ) {
    country
  }
}
```
:::info
Both update and delete mutations need the id field, to know which object in the model the
mutation should be applied to.
:::

```graphql title=Delete
mutation {
	deleteProject(
    id:"799da30e-96eb-4367-bab1-1d0421ad360c"
  ) {
    message
    errors {
      field
      messages
    }
  }
}
```
:::info
The delete mutation doesn't returns the field of the deleted object, it only returns the message, and errors fields, which hold information about the delete operation.
:::

The errors field is shared by all CUD mutations and it gives information if there is any error in the 
operation. This field has 2 subfields which give the error information:

```graphql
errors {
    field
    messages
}
```

`field` says to which field of the input arguments the error is related to, and `messages` gives a string
with information of the error in the given `field`.

To handle relations in the mutations, you must know the id of the object to relate. For example, if you 
want to relate a **Site** object to and object of the **Project** model at creation you will do it like this:

```graphql
mutation {
	createSite(
    identifier: "site 1",
    project: "799da30e-96eb-4367-bab1-1d0421ad360c"
  ) {
    id
  }
}
```

This will create the _site_ "site 1" and it will be related to the _project_ with id `799da30e-96eb-4367-bab1-1d0421ad360c`. But what if we have a model that has a _OneToMany_ relation with
another model? In this case we can achieve the relation several object of another model by passing a 
list of ids:

```graphql
mutation {
	createGroup(
      name: "test group 1"
      users: [
        "56yda30e-96eb-4367-bab1-1d0421ad360c",
        "56yda30e-96eb-65kl-568k-1d0421ad360c",
        "56yda30e-96eb-549k-bab1-1d345jad360c"
      ]
    ) {
        id
    }
}
```
:::caution
The Group model is different from any other model. Here is used to show how to relate multiple objects,
or entries in the db that hold a _OneToMany_ relation with another model, but this model has
a different resolver than the others, and that's why it doesn't have an errors field.
:::
