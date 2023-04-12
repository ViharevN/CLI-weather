#!/usr/bin/env node
import {getArgs} from "./helpers/args.js";
import {printError, printHelp, printSuccess, printWeather} from "./services/log.service.js";
import {getKeyValue, saveKeyValue, TOKEN_DICTIONARY} from "./services/storage.service.js";
import {getIcon, getWeather} from "./services/api.service.js";


const saveToken = async (token) => {
    if (!token.length) {
        printError('Not found token')
        return;
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.token, token);
        printSuccess('token saved')
    } catch (e){
        printError(e.message)
    }
};

const saveCity = async (city) => {
    if (!city.length) {
        printError('Not found city')
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.city, city);
        printSuccess('City saved');
    } catch (e) {
        printError(e.message);
    }
};

const getForCast = async () => {
    try {
        const city = process.env.CITY ?? await getKeyValue(TOKEN_DICTIONARY.city)
        const weather = await getWeather(city);
        const icon = getIcon(weather.weather[0].icon);
        printWeather(weather, icon);
    } catch (e) {
        if (e?.response?.satatus == 404) {
            printError("'City incorrect");
        }else if (e?.response?.satatus == 401) {
            printError('Invalid token');
        } else {
            printError(e.message)
        }
    }

};

const  initCLI =() => {
    const args = getArgs(process.argv);
    if (args.h) {
        return printHelp();
    }
    if (args.s) {
        return saveCity(args.s);
    }
    if (args.t) {
        return  saveToken(args.t)
    }
    return getForCast();
};



    initCLI();