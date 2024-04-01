package internal

import (
	"net/http"
	"strings"

	"github.com/golang-jwt/jwt"
	"github.com/labstack/echo/v4"
)

func JWTMiddleware(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		authHeader := c.Request().Header.Get("Authorization")
		if authHeader == "" {
			return echo.NewHTTPError(http.StatusUnauthorized, "Token JWT ausente")
		}

		authParts := strings.Split(authHeader, " ")
		if len(authParts) != 2 || authParts[0] != "Bearer" {
			return echo.NewHTTPError(http.StatusUnauthorized, "Formato de token JWT invalido")
		}

		tokenString := authParts[1]
		token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
			return []byte("sua-chave-secreta"), nil
		})
		if err != nil {
			return echo.NewHTTPError(http.StatusUnauthorized, "Token JWT invalido")
		}

		c.Set("user", token.Claims)
		return next(c)
	}
}
