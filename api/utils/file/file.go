package file

import (
	"io"
	"mime/multipart"
	"os"
)

func SaveFile(file *multipart.FileHeader, fileName string, path string) error {
	//Source
	src, err := file.Open()
	if err != nil {
		return err
	}
	defer src.Close()
	// Destination
	dst, err := os.Create("storages" + path + "/" + fileName)
	if err != nil {
		return err
	}
	defer dst.Close()
	// Copy
	if _, err = io.Copy(dst, src); err != nil {
		return err
	}
	return nil
}

const letterBytes = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
