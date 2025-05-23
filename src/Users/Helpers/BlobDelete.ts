import { BlobServiceClient } from "@azure/storage-blob";

const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING!;
const CONTAINER_NAME = process.env.CONTAINER_NAME || ''; // cambia por el tuyo

const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
const containerClient = blobServiceClient.getContainerClient(CONTAINER_NAME);

export const eliminarFotoAnterior = async (url: string) => {
    try {
        const blobName = extraerNombreArchivoDesdeUrl(url);
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        await blockBlobClient.deleteIfExists();
        console.log(`Imagen eliminada: ${blobName}`);
    } catch (error) {
        console.error("Error eliminando imagen:", error);
        throw error;
    }
};

const extraerNombreArchivoDesdeUrl = (url: string): string => {
    return url.split("/").pop() || "";
};

export default eliminarFotoAnterior;