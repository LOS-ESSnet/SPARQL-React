import csv

"""Enable to produce sample ttl"""
sample = False

"""Define usefull predicates"""
predicate_name = "rdfs:label"
predicate_long = "geo-pos:long"
predicate_lat = "geo-pos:lat"
predicate_purpose = "org:purpose"
predicate_located = "gn:locatedIn"

"""Define csv headers"""
SIREN = "SIREN"
NIC = "NIC"
APEN = "APEN700"
NOMEN_LONG = "NOMEN_LONG"
LONGITUDE = "longitude"
LATITUDE = "latitude"
DEP = "DEPET"
COM = "COMET"

""""Define prefixes"""
BASE_URI_SIRET = "http://id.insee.fr/sirene/siret/"
BASE_URI_POINT = "http://id.insee.fr/geo/point/"
BASE_URI_API = "http://id.insee.fr/codes/nafr2/sousClasse/";
BASE_URI_DEP = "http://id.insee.fr/geo/departement/";
BASE_URI_COM = "http://id.insee.fr/geo/commune/";

""""Usefull methods"""
def addChevrons( string ):
   return "<" + string + ">"

def create_line_string( predicate, object ):
   return "    " + predicate + " \"" + object.replace('"','')  + "\" ; \n"

def create_line_url( predicate, object ):
   return "    " + predicate + " " + addChevrons(object.replace('"',''))  + " ; \n"

def create_line_float( predicate, object ):
   return "    " + predicate + " \"" + object.replace('"','')  + "\"^^xsd:float ; \n"

def create_point(siret, lat, long):
    point_url = addChevrons(BASE_URI_POINT+siret)
    point ="    geo:hasPointGeometry %s .\n"%(point_url)
    point += "%s geo:asWKT \"POINT(%s %s)\"^^geo:wktLiteral .\n"%(point_url, long, lat)
    return point

"""Build ttl file from csv"""
with open('geo-sirene.ttl', 'w', encoding="utf8") as output:
    """Write prefixes"""
    output.write("@prefix  rdfs: <http://www.w3.org/2000/01/rdf-schema#> .\n")
    output.write("@prefix  geo-pos: <http://www.w3.org/2003/01/geo/wgs84_pos#> .\n")
    output.write("@prefix  xsd: <http://www.w3.org/2001/XMLSchema#> .\n")
    output.write("@prefix  rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .\n")
    output.write("@prefix  geo: <http://www.opengis.net/ont/geosparql#> .\n")
    output.write("@prefix  org: <http://www.w3.org/ns/org#> .\n")
    output.write("@prefix  gn: <http://www.geonames.org/ontology#> .\n")
    output.write("\n")

    with open('geo_sirene.csv', 'r', encoding="utf8") as csvfile:
        csvreader = csv.reader(csvfile, delimiter=',', quotechar='"')

        """Get usefull header indexes"""
        headers = next(csvreader)

        indice_SIREN =  headers.index(SIREN)
        indice_NIC =  headers.index(NIC)
        indice_NOMEN_LONG =  headers.index(NOMEN_LONG)
        indice_LONGITUDE =  headers.index(LONGITUDE)
        indice_LATITUDE =  headers.index(LATITUDE)
        indice_APEN =  headers.index(APEN)
        indice_DEP =  headers.index(DEP)
        indice_COM =  headers.index(COM)

        i=0
        """Get lines to build resources writing triples"""
        for row in csvreader:
            siret = row[indice_SIREN]+row[indice_NIC]
            better_apen = row[indice_APEN][:2]+"."+row[indice_APEN][2:]
            dep = row[indice_DEP]
            com = dep+ row[indice_COM]

            output.write(addChevrons(BASE_URI_SIRET+siret)+"\n")
            output.write("    rdf:type org:OrganizationalUnit ;\n ")
            output.write(create_line_string(predicate_name,row[indice_NOMEN_LONG]))
            output.write(create_line_url(predicate_purpose,BASE_URI_API+better_apen))
            output.write(create_line_url(predicate_located,BASE_URI_DEP+dep))
            output.write(create_line_url(predicate_located,BASE_URI_COM+com))
            output.write(create_line_float(predicate_long,row[indice_LONGITUDE]))
            output.write(create_line_float(predicate_lat,row[indice_LATITUDE]))
            output.write(create_point(siret, row[indice_LATITUDE], row[indice_LONGITUDE] ))
            output.write("\n")

            i+=1

            if (i%100000==0):
                print(i)
                if(sample):
                    break
