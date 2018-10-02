import csv

"""Enable to produce sample ttl"""
sample = False

"""Define usefull predicates"""
predicate_name = "rdfs:label"
predicate_long = "geo-pos:long"
predicate_lat = "geo-pos:lat"
predicate_purpose = "org:purpose"
predicate_located = "gn:locatedIn"
predicate_eff = "dim-etab:effectif"

"""Define csv headers"""
SIREN = "SIREN"
NIC = "NIC"
APEN = "APEN700"
NOMEN_LONG = "NOMEN_LONG"
LONGITUDE = "longitude"
LATITUDE = "latitude"
DEP = "DEPET"
COM = "COMET"
EFF = "EFETCENT"

""""Define prefixes"""
BASE_URI_SIRET = "http://id.insee.fr/sirene/siret/"
BASE_URI_POINT = "http://id.insee.fr/geo/point/"
BASE_URI_API = "http://id.insee.fr/codes/nafr2/sousClasse/";
BASE_URI_DEP = "http://id.insee.fr/geo/departement/";
BASE_URI_COM = "http://id.insee.fr/geo/commune/";

""""Usefull methods"""
def addChevrons( string ):
   return "<" + string + ">"

def create_line( predicate, object ):
   return "    " + predicate + " " + object.replace('"','')  + " ; \n"

def create_line_string( predicate, object ):
   return "    " + predicate + " \"" + object.replace('"','')  + "\" ; \n"

def create_line_uri( predicate, object ):
   return "    " + predicate + " " + addChevrons(object.replace('"',''))  + " ; \n"

def create_line_float( predicate, object ):
   return "    " + predicate + " \"" + object.replace('"','')  + "\"^^xsd:float ; \n"

def create_point(siret, lat, long):
    point_uri = addChevrons(BASE_URI_POINT+siret)
    point ="    geo:hasPointGeometry %s .\n"%(point_uri)
    point += "%s geo:asWKT \"POINT(%s %s)\"^^geo:wktLiteral .\n"%(point_uri, long, lat)
    return point

def create_effectif_uri(eff):
    if (eff == 'NN'):
        return "tranche-eff:0"
    eff = int(eff)
    if (eff >= 500):
        return "tranche-eff:500"
    if (eff >= 200):
        return "tranche-eff:200"
    if (eff >= 100):
        return "tranche-eff:100"
    if (eff >= 50):
        return "tranche-eff:50"
    if (eff >= 20):
        return "tranche-eff:20"
    if (eff >= 10):
        return "tranche-eff:10"
    if (eff >= 1):
        return "tranche-eff:1"
    return "tranche-eff:0"

def create_code_list_item(code, label):
    item = "\n"
    item += "tranche-eff:%s a skos:Concept ; \n"%(code)
    item += "    skos:inScheme <http://id.insee.fr/codes/tranche-effectif> ; \n"
    item += "    skos:prefLabel \"%s\"@fr . \n"%(label)
    return item

def create_code_list():
   cl = "<http://id.insee.fr/codes/tranche-effectif> a skos:ConceptScheme . \n"
   cl += create_code_list_item("0", "0 salarié ou effectif inconnu")
   cl += create_code_list_item("1", "1 à 9 salariés")
   cl += create_code_list_item("10", "10 à 19 salariés")
   cl += create_code_list_item("20", "20 à 49 salariés")
   cl += create_code_list_item("50", "50 à 99 salariés")
   cl += create_code_list_item("100", "100 à 199 salariés")
   cl += create_code_list_item("200", "200 à 499 salariés")
   cl += create_code_list_item("500", "500 salariés ou plus")
   return cl

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
    output.write("@prefix  tranche-eff: <http://id.insee.fr/codes/tranche-effectif/> . \n")
    output.write("@prefix  dim-etab: <http://id.insee.fr/sirene/etablissement/> .\n")
    output.write("@prefix  skos: <http://www.w3.org/2004/02/skos/core#> . \n")
    output.write("\n")

    """Write code list"""
    output.write(create_code_list())
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
        indice_EFF =  headers.index(EFF)

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
            output.write(create_line_uri(predicate_purpose,BASE_URI_API+better_apen))
            output.write(create_line_uri(predicate_located,BASE_URI_DEP+dep))
            output.write(create_line_uri(predicate_located,BASE_URI_COM+com))
            output.write(create_line_float(predicate_long,row[indice_LONGITUDE]))
            output.write(create_line_float(predicate_lat,row[indice_LATITUDE]))
            output.write(create_line(predicate_eff,create_effectif_uri(row[indice_EFF])))
            output.write(create_point(siret, row[indice_LATITUDE], row[indice_LONGITUDE] ))
            output.write("\n")

            i+=1

            if (i%100000==0):
                print(i)
                if(sample):
                    break
