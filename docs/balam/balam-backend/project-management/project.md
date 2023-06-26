---
sidebar_position: 1
---

# Project

The Project table holds basic information about the project like name, where is been carried out, a general description, etc. It has two special fields that are for internal use only: shortname and project_hash. This two fields aims to easily refer to the project from another tools and apps within biometrio.earth data managements teams.

|   Field  | 	   Type	     | Used in search [?](../../balam-api/search-and-filter.md#search) | Description |  Observations | 
|:--------:|:-------------:|:------------------:|:------------------:|------------------:|
| title | string | ✓ | Project's name | <span style={{ borderBottom: "1px solid green"}}>Unique.</span> <span style={{ borderBottom: "1px solid green"}}>Required.</span> | 
| shortname | string | ✓ | Project's shortname identifier | Its purpose is to easily identify the project from another app or service, can be an acronym of the title. <span style={{ borderBottom: "1px solid green"}}>Unique.</span> <span style={{ borderBottom: "1px solid green"}}>Required.</span> |
| project_hash | string | | Project's hash serves as an additional identifier | It's created by Django when a new project is created or when updated the shortname. It's a md5 encryption of the shortname. <span style={{ borderBottom: "1px solid green"}}>Unique.</span> <span style={{ borderBottom: "1px solid green"}}>Required.</span>  |
| sequence_interval | integer | | Sets the maximum number of seconds between timestamps of succesive media files. | Optional |
| description | string | | Short description of the project | Optional |
| contacts | string | | Stores contact information in a string with a special format `name:phone:email` with `,`  as a separator | Optional |
| duration | string | | The project entire duration | Can be 5 days, 1 year or undetermined. Optional |
| temporality | string | | Project temporality of each monitoring event | Can be 1 day, a few hours or up to 36 days. Optional |
| project_configuration | integer | | Set the project to only have sampling points associated, or sites and sampling points or the more complex, sites, sampling areas and sampling points. | Stored as an integer, 1 represents only sampling points, 2 represents sampling points with sites and 3 the more complex one. Default is stored with 1. <span style={{ borderBottom: "1px solid green"}}>Required.</span> |
| countries | string | | Country or countries where the project is carried out. | Stored as a string with comma separated country codes. Can be left empty. Optional. | 

When creating or updating a project, the field country must be filled with a list of the anum values of the countries like so:

```graphql
mutation {
  createProject(
    title: "Test number 1",
    shortname: "test1",
    projectConfiguration: 2,
    countries: [LU,AX,MX]
  ) {
    id
    countries {
      name
    }
  } 
}
```
:::info
You must not include the `project_hash` field when creating a project. This is automatically filled by Django using the shortname. 
:::


## Enums

You can have the list of enum values for the countries with this query:

```graphql
{
  __type(name: "ProjectCountries") {
    name
    enumValues {
      name
      description
    }
  }
}
```

this returns:

```graphql
{
  "data": {
    "__type": {
      "name": "ProjectCountries",
      "enumValues": [
        {
          "name": "AF",
          "description": "Afghanistan"
        },
        {
          "name": "AX",
          "description": "Åland Islands"
        },
        {
          "name": "AL",
          "description": "Albania"
        },
        ...
      ]
    }
  }
}
```

and also the list of enum values for the project configuration:

```graphql
{
  __type(name: "ProjectmanagementProjectProjectConfigurationChoices") {
    name
    enumValues {
      name
      description
    }
  }
}
```
which returns: 

```graphql
{
  "data": {
    "__type": {
      "name": "ProjectmanagementProjectProjectConfigurationChoices",
      "enumValues": [
        {
          "name": "A_1",
          "description": "Only sampling points"
        },
        {
          "name": "A_2",
          "description": "Sampling points with sites"
        },
        {
          "name": "A_3",
          "description": "Sites, Sampling Areas and Sampling points"
        }
      ]
    }
  }
}
```
the `A_` prefix is attached by graphene due to collision issues, the actual value stored in the database doesn't have this prefix.
:::caution
When creating or udating a new project you must use the enum to refer the value of the project configuration. For example if you want to set the project as the more complex one, you set A_3 as the value for projectConfiguration.
:::

## Special fields

When querying the country, in the `project` query or in any other query that uses the `ProjectType` you can get more information:

```graphql
{
  project(shortname: "test") {
    countries {
      name
    	code  
			alpha3
      numeric
      iocCode
    }
  }
}
```

The fields of the countries object type refers to:

- `name` for the full country name
- `code` for the ISO 3166-1 two character country code
- `alpha3` for the ISO 3166-1 three character country code
- `numeric` for the ISO 3166-1 numeric country code
- `iocCode` for the International Olympic Committee country code

Also, in `ProjectType` you can do something similar with projectConfiguration, the fields available are

- `value` the actual value saved in the database
- `description` the human-readable description of the project configuration.

you can query that like this

```graphql
{
  project(shortname: "xprize_test_annotations") {
    countries {
      name
      code
      alpha3
      numeric
      iocCode
    }
    projectConfiguration {
      value
      description
    }
  }
}
```

which would respond

```graphql
{
  "data": {
    "project": {
      "countries": [
        {
          "name": "Singapore",
          "code": "SG",
          "alpha3": "SGP",
          "numeric": 702,
          "iocCode": "SGP"
        }
      ],
      "projectConfiguration": {
        "value": 1,
        "description": "Only sampling points"
      }
    }
  }
}
```

:::note
When using the `filters` argument of the List queries with the `countries` field, you should only use the `contains` and `notContains` operators, to have a better response. That's because when we save more than one country, it is saved as a comma separated string.
:::