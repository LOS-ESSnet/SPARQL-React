# Produce census-point

Download wgs84 shapefile source data [here](http://data.cquest.org/insee_carroyage/200m_carreaux_metropole_shapefile_wgs84.zip)

Extract from zip and use ogr2ogr to convert the data to CSV
```
ogr2ogr -f "CSV" -lco GEOMETRY=AS_WKT -lco SEPARATOR=SEMICOLON 200m_carreaux_metropole.csv 200m_carreaux_metropole.shp
```

Run script to produce the rdf data:
```
python census_point_to_rdf.py
```

The resulting file (census.ttl) is 1.6GB
