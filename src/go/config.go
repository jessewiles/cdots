package main

import (
	"os"
)

type configuration struct {
	TemplateDirectory string
	StaticDirectory   string
	MongoHost         string
	MongoPort         string
	MongoUser         string
	MongoPassword     string
}

var Config configuration

func init() {
	var exists bool
	Config = configuration{}
	if Config.TemplateDirectory, exists = os.LookupEnv("CDOTS_TMPL_DIR"); !exists {
		Config.TemplateDirectory = "./templates/*"
	}
	if Config.StaticDirectory, exists = os.LookupEnv("CDOTS_STATIC_DIR"); !exists {
		Config.StaticDirectory = "../../public"
	}
	if Config.MongoHost, exists = os.LookupEnv("CDOTS_MONGO_HOST"); !exists {
		Config.MongoHost = "localhost"
	}
	if Config.MongoPort, exists = os.LookupEnv("CDOTS_MONGO_PORT"); !exists {
		Config.MongoPort = "27017"
	}
	if Config.MongoUser, exists = os.LookupEnv("CDOTS_MONGO_USER"); !exists {
		Config.MongoUser = "root"
	}
	if Config.MongoPassword, exists = os.LookupEnv("CDOTS_MONGO_PASSWORD"); !exists {
		Config.MongoPassword = "password!"
	}
}
