---
sidebar_position: 2
---

# Site

The site table has information about the polygon where the science team is monitoring certain points. This entity helps to delimit the area where we deploy our monitoring devices, it can have a georefence (as a polygon) or not.

|   Field  | 	   Type	     | Used in search [?](../../balam-api/search-and-filter.md#search) | Description |  Observations | 
|:--------:|:-------------:|:------------------:|:------------------:|------------------:|
| identifier | string | ✓ | Site identifier within the company | <span style={{ borderBottom: "1px solid green"}}>Unique.</span> <span style={{ borderBottom: "1px solid green"}}>Required.</span> |
| description | string | | Short description of the site | Optional |
| metadata | JSON | | Site's metadata where we can include extra information | Optional |
| geometry | Polygon | | Polygon which delimits area of the site | Optional |
| ecosystem | Foreign Key (UUID) | | Ecosystem of the Site | Optional |


:::tip
The geometry field can be setted upon creation or not. If more than three _Sampling Areas_ or _Sampling Points_ (depends on the Project's configuration) are related to the _Site_, then a __Polygon__ is created based on these points.
:::