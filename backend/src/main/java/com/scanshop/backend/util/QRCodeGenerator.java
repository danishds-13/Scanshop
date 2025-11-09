package com.scanshop.backend.util;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.qrcode.QRCodeWriter;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.util.Base64;
import javax.imageio.ImageIO;

public class QRCodeGenerator {

    public static String generateQRCodeBase64(String data, int width, int height) throws Exception {
        QRCodeWriter qrCodeWriter = new QRCodeWriter();
        BufferedImage qrImage;

        try {
            qrImage = MatrixToImageWriter.toBufferedImage(
                    qrCodeWriter.encode(data, BarcodeFormat.QR_CODE, width, height)
            );
        } catch (WriterException e) {
            throw new Exception("Failed to generate QR code: " + e.getMessage());
        }

        try (ByteArrayOutputStream baos = new ByteArrayOutputStream()) {
            ImageIO.write(qrImage, "png", baos);
            byte[] imageBytes = baos.toByteArray();
            return Base64.getEncoder().encodeToString(imageBytes);
        }
    }
}
