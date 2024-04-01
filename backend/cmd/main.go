package main

import (
	"fmt"
	"net/http"
	"time"

	"github.com/gabrielmenezes/myfinance-org-backend/internal"
	"github.com/golang-jwt/jwt"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

type User struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

var jwtSecret = []byte("sua-chave-secreta")

func main() {

	e := echo.New()

	e.Use(middleware.Logger())
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins:     []string{"http://localhost:3000"}, // Permitir solicitações somente do localhost:3000
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"*"},
		AllowCredentials: true,
	}))

	e.POST("/login", loginHandler)

	e.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "Hello World!")
	})

	e.GET("/teste", test, internal.JWTMiddleware)

	e.Logger.Fatal(e.Start(":8080"))
}

func loginHandler(c echo.Context) error {
	user := User{
		Username: "usuario",
		Password: "senha",
	}

	if c.FormValue("username") != user.Username || c.FormValue("password") != user.Password {
		return echo.ErrUnauthorized
	}

	token := jwt.New(jwt.SigningMethodHS256)
	claims := token.Claims.(jwt.MapClaims)
	claims["username"] = user.Username
	claims["exp"] = time.Now().Add(time.Hour * 72).Unix()

	tokenString, err := token.SignedString(jwtSecret)
	if err != nil {
		return err
	}

	return c.JSON(http.StatusOK, map[string]string{
		"token": tokenString,
	})
}

func test(c echo.Context) error {
	claims, ok := c.Get("user").(jwt.MapClaims)
	if !ok {
		return echo.NewHTTPError(http.StatusInternalServerError, "Erro ao recuperar informacoes do token")
	}

	username, ok := claims["username"].(string)
	if !ok {
		return echo.NewHTTPError(http.StatusInternalServerError, "Erro ao recuperar usuario do token")
	}
	return c.String(http.StatusOK, fmt.Sprintf("Ola, %s!", username))
}
