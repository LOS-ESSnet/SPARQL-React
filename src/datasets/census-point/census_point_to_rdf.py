import csv
import os
from shapely import wkt
import tqdm

# CSV source file columns
# 0 WKT
# 1 idINSPIRE
# 2 id
# 3 idk
# 4 ind_c
# 5 nbcar

output_filename = 'census.ttl'
input_filename = '200m_carreaux_metropole.csv'

def createUri(id):
	return "http://id.los.org/" + id.lower()

def createGeomUri(id):
	return createUri(id) + "/geometry"

def addChevrons( string ):
   return "<" + string + ">"

try:
	os.remove(output_filename)
except:
	pass

with open(output_filename, 'w') as output:

	output.write("@prefix geo-pos: <http://www.w3.org/2003/01/geo/wgs84_pos#> .\n")
	output.write("@prefix geo: <http://www.opengis.net/ont/geosparql#> .\n")
	output.write("@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .\n")
	output.write("@prefix dc: <http://purl.org/dc/elements/1.1/> .\n")
	output.write("@prefix gn: <http://www.geonames.org/ontology#> .\n")
	output.write('\n')

	with open(input_filename, 'r') as inputfile:

		inputreader = csv.reader(inputfile, delimiter=';', quotechar='"')
		headers = next(inputreader, None)

		for row in inputreader:
			polygon = wkt.loads(row[0])

			output.write(addChevrons(createGeomUri(row[1]))+'\n')
			output.write('\ta\tgeo:Geometry ;\n')
			output.write('\trdfs:label\t"Geometry for polygon '+row[1]+'"@en ;\n')
			output.write('\tgeo:asWKT\t"'+str(row[0])+'"^^geo:wktLiteral .\n')
			output.write('\n')

			output.write(addChevrons(createUri(row[1]))+'\n')
			output.write('\ta\tgeo:Feature ;\n')
			output.write('\ta\tgeo-pos:SpatialThing ;\n')
			output.write('\tdc:identifier\t"'+row[1]+'" ;\n')
			output.write('\tgn:population\t"'+row[4]+'" ;\n')
			output.write('\tgeo:hasGeometry\t'+addChevrons(createGeomUri(row[1]))+' ;\n')
			output.write('\tgeo-pos:long\t"%s"^^xsd:double ;\n'%(polygon.centroid.x))
			output.write('\tgeo-pos:lat\t"%s"^^xsd:double .\n'%(polygon.centroid.y))
			output.write('\n')

