import chalk from 'chalk';
import dedent from 'dedent-js';

const printError = (error) => {
    console.log(chalk.bgRed('ERROR') + ' ' + error);
};

const printSuccess = (message) => {
    console.log(chalk.bgGreen('SUCCESS' + ' ' + message))
}

const printHelp = () => {
    console.log(
        dedent(
            dedent(
                `${chalk.bgCyan('HELP')}
                node weather.js получение погоды
                -s [CITY] - сохранить город
                -h -help
                -t [API_KEY] - сохранить токен`
            )
        ))
};

const printWeather = async (res, icon) => {
    await console.log(
        dedent(
`${chalk.bgYellow('WEATHER')} Погода в городе: ${res.name}
              ${icon} ${res.weather[0].description}
              Температура: ${res.main.temp} Ощущается как: ${res.main.feels_like}
              Влажность: ${res.main.humidity}%
              Скорость ветра: ${res.wind.speed}`
        ));
}

export {printSuccess, printError, printHelp, printWeather}

