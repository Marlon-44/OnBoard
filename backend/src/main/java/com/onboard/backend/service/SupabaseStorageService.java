package com.onboard.backend.service;

import okhttp3.*;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.IIOImage;
import javax.imageio.ImageIO;
import javax.imageio.ImageWriteParam;
import javax.imageio.ImageWriter;
import javax.imageio.stream.MemoryCacheImageOutputStream;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Iterator;

@Service
public class SupabaseStorageService {

    private static final String SUPABASE_URL = "https://lklfmpejhtqwuhlyhpud.supabase.co";
    private static final String SUPABASE_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxrbGZtcGVqaHRxd3VobHlocHVkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0OTQxNTM5MCwiZXhwIjoyMDY0OTkxMzkwfQ.3vsYeeUOPItIBmYO5K1KpaDbfGYi7j8HJ75jfNqIV4k";
    private static final OkHttpClient client = new OkHttpClient();

    public String uploadFile(MultipartFile file, String filePath, String bucketName) throws IOException {

        byte[] fileBytes = convertToJpegAndCompress(file, 0.5f); 


        if (!filePath.toLowerCase().endsWith(".jpg")) {
            filePath += ".jpg";
        }

        String uploadUrl = SUPABASE_URL + "/storage/v1/object/" + bucketName + "/" + filePath;

        RequestBody requestBody = RequestBody.create(fileBytes, MediaType.parse("image/jpeg"));
        Request request = new Request.Builder()
                .url(uploadUrl)
                .addHeader("Authorization", "Bearer " + SUPABASE_API_KEY)
                .addHeader("x-upsert", "true")
                .put(requestBody)
                .build();

        try (Response response = client.newCall(request).execute()) {
            if (!response.isSuccessful()) {
                throw new IOException("Error al subir archivo: " + response);
            }
            return SUPABASE_URL + "/storage/v1/object/public/" + bucketName + "/" + filePath;
        }
    }

    private byte[] convertToJpegAndCompress(MultipartFile file, float quality) throws IOException {
        BufferedImage image = ImageIO.read(file.getInputStream());

        if (image == null) {
            throw new IOException("El archivo no es una imagen válida.");
        }

        ByteArrayOutputStream compressed = new ByteArrayOutputStream();
        Iterator<ImageWriter> writers = ImageIO.getImageWritersByFormatName("jpeg");
        if (!writers.hasNext()) {
            throw new IllegalStateException("No se encontró un escritor JPEG.");
        }

        ImageWriter writer = writers.next();
        ImageWriteParam param = writer.getDefaultWriteParam();
        param.setCompressionMode(ImageWriteParam.MODE_EXPLICIT);
        param.setCompressionQuality(quality); // 0.0 (baja calidad) a 1.0 (alta calidad)

        writer.setOutput(new MemoryCacheImageOutputStream(compressed));
        writer.write(null, new IIOImage(image, null, null), param);
        writer.dispose();

        return compressed.toByteArray();
    }
}
