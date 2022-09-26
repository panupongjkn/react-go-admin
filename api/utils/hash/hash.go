package hash

import "golang.org/x/crypto/bcrypt"

func Hash(value string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(value), 14)
	return string(bytes), err
}

func CheckHash(hashPassword, password string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hashPassword), []byte(password))
	return err == nil
}
