package com.google.firebase.quickstart;

import java.net.*;
import java.io.*;
import java.util.*;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.database.*;

public class Driver {

        // VARIABLES
        private static int port = 80;

    public static void main(String[] args) throws IOException, NoSuchAlgorithmException {

        // INITIALIZE FIREBASE
        Firebase fbRef = new Firebase("https://telephone-game-aw.firebaseio.com/");
        // FirebaseOptions options = new FirebaseOptions.Builder()
        //     .setCredentials(GoogleCredentials.getApplicationDefault())
        //     .setDatabaseUrl("https://telephone-game-aw.firebaseio.com/")
        //     .build();
        // FirebaseApp.initializeApp(options);

        // LAUNCH
        System.out.println("Launching Driver.");

        // INITIALIZE SERVER CONNECTION
        ServerSocket my_server = new ServerSocket(port);

        try {
            // GET CURRENT IP ADDRESS
            InetAddress localhost = InetAddress.getLocalHost();
            String ip = localhost.getHostAddress().trim();

      			// OPEN SOCKET
      			System.out.println("Started server on: " + ip + ":" + port);
      			Socket s = my_server.accept();
            System.out.println("A client has connected.");

      			// ACCEPT FILE
      			InputStream in = s.getInputStream();
      			OutputStream out = s.getOutputStream();
      			Scanner reader = new Scanner(in, "UTF-8");
      			System.out.println("Data Stream esablished.");

            // HANDSHAKE
            try {
        				String data = reader.useDelimiter("\\r\\n\\r\\n").next();
        				Matcher get = Pattern.compile("^GET").matcher(data);
                System.out.println("Received message: " + data);
                if (get.find()) {
          					Matcher match = Pattern.compile("Sec-WebSocket-Key: (.*)").matcher(data);
          					match.find();
          					byte[] response = ("HTTP/1.1 101 Switching Protocols\r\n"
          						+ "Connection: Upgrade\r\n"
          						+ "Upgrade: websocket\r\n"
          						+ "Sec-WebSocket-Accept: "
          						+ Base64.getEncoder().encodeToString(MessageDigest.getInstance("SHA-1").digest((match.group(1) + "258EAFA5-E914-47DA-95CA-C5AB0DC85B11").getBytes("UTF-8")))
          						+ "\r\n\r\n").getBytes("UTF-8");
          					out.write(response, 0, response.length);
                    byte[] decoded = new byte[6];
          					byte[] encoded = new byte[] { (byte) 198, (byte) 131, (byte) 130, (byte) 182, (byte) 194, (byte) 135 };
          					byte[] key = new byte[] { (byte) 167, (byte) 225, (byte) 225, (byte) 210 };
          					for (int i = 0; i < encoded.length; i++) {
          						decoded[i] = (byte) (encoded[i] ^ key[i & 0x3]);
          					}
                    System.out.println(new String(decoded, "UTF-8"));
		            }
            } finally {
            	reader.close();
            }
      	} finally {
          System.out.println("Closing Server!");
      		my_server.close();
      	}
  	}
}
