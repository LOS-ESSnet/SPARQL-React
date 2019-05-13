import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class SireneSampler {

	static final String DEPARTMENT_TO_EXTRACT = "68";
	static final String URI_TO_MATCH ="http://id.insee.fr/geo/departement/" + DEPARTMENT_TO_EXTRACT;
	static final Path DATA_FOLDER = Paths.get("D:\\Temp\\SIRENE");

	public static void main(String[] args) throws IOException {

		String inputFileName = DATA_FOLDER.resolve("geo-sirene.ttl").toString();
		String outputFileName = DATA_FOLDER.resolve("geo-sirene-" + DEPARTMENT_TO_EXTRACT + ".ttl").toString();
//		Files.lines(Paths.get(inputFileName)).limit(100).forEach(System.out::println);

		String line = null;
		StringBuilder chunk = new StringBuilder();

		BufferedReader turtleReader = new BufferedReader(new FileReader(inputFileName));
		BufferedWriter turtleWriter = new BufferedWriter(new FileWriter(outputFileName));

        while ((line = turtleReader.readLine()) != null) {

        	if (line.startsWith("@prefix")) {
        		turtleWriter.write(line + System.lineSeparator());
        		continue;
        	}
        	if (line.length() == 0) {
        		if (chunk.indexOf(URI_TO_MATCH) >= 0) turtleWriter.write(System.lineSeparator() + chunk.toString());
    			chunk.setLength(0);
        	} else chunk.append(line).append(System.lineSeparator());
         }
    	turtleReader.close();
    	turtleWriter.close();
	}

}
