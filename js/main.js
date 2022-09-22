const apiKey = '1246937060eb0d6dde740d0a2a8db4dd';
const link = `http://api.weatherstack.com/current?access_key=${apiKey}`;

const root = document.getElementById('root');

let store = {
  city: 'Тунис',
  cloudcover: 0,
  temperature: 0,
  observationTime: '00:00 AM',
  isDay: 'yes',
  description: '',
  localtime:'',
  properties: {
    cloudcover: {},
    humidity: {},
    windSpeed: {},
    pressure: {},
    uvIndex: {},
    visibility: {},
  }
};

const city = document.getElementById('text-input');
console.log(city);
city.value = store.city;

const fetchData = async () => {
  try{
    const result = await fetch(`${link}&query=${store.city}`);
    const data = await result.json();
    console.log(data)
    const {
      current: {
        cloudcover,
        temperature,
        humidity,
        observation_time: observationTime,
        pressure,
        uv_index: uvIndex,
        visibility,
        is_day: isDay,
        weather_descriptions: description,
        wind_speed: windSpeed,
      },
      location: { 
        name,
        localtime
      },
    } = data;
    console.log(localtime);
  
    store = {
      ...store,
      city: name,
      temperature,
      observationTime,
      isDay,
      description: description[0],
      localtime,
      properties: {
        cloudcover: {
          title: 'cloudcover',
          value: `${cloudcover} %`,
          icon: 'cloud.png'
        },
        humidity: {
          title: 'humidity',
          value: `${humidity} %`,
          icon: 'humidity.png'
        },
        windSpeed: {
          title: 'windSpeed',
          value: `${humidity} km/h`,
          icon: 'wind.png'
        },
        pressure: {
          title: 'pressure',
          value: `${pressure} Pa`,
          icon: 'gauge.png'
        },
        uvIndex: {
          title: 'uvIndex',
          value: `${uvIndex} %`,
          icon: 'uv-index.png'
        },
        visibility: {
          title: 'visibility',
          value: `${visibility} %`,
          icon: 'visibility.png'
        },
      }
    };
    renderComponent();
  }catch(err){
    console.log(err);
  }
}

const getImage = (description) => {
  let value = description.toLowerCase();
  switch (value) {
    case 'overcast':
      return 'partly.png'
    case 'cloud':
      return 'cloud.png'
    case 'fog':
      return 'fog.png'
    case 'sunny':
      return 'sunny.png'
    default:
      return 'the.png'
  }
}

const renderProperty = (properties) => {
  return Object.values(properties).map(({ title, value, icon }) => {
    return `
          <div class="list__item">
            <img class="list__image" src="./img/icons/${icon}" alt="">
            <div class="list__content">
                <p class="list__title">
                  ${value}
                </p>
                <p class="list__subtitle">
                  ${title}
                </p>
            </div>
          </div>
    `;
  }).join('');
}

const markup = () => {
  const {
    description,
    temperature,
    isDay,
    localtime,
    properties
  } = store;

  console.log(localtime);

  day = isDay === 'yes'? 'is-day' : '';

  return ` 
        <div class="content ${day}">
        <div class="info content__info">
              <p class="block__time">
                ${localtime}
              </p>
            </div>
            <h1 class="city">
            </h1>
            <div class="temperature">
              <img class="info__icon" src="./img/${getImage(description)}" alt="" />
              <p class="info__temperature">${temperature}°</p>
            </div>
            <p class="block__feeling">
                  ${description}
            </p>
            <div class="description content__description">
              <div class="list">${renderProperty(properties)}</div>
            </div>
      </div>
  `
}

const renderComponent = () => {
  root.innerHTML = markup();
}

const changeForm = (e) => {
  e.preventDefault();

}

const form = document.getElementById('form');

form.addEventListener('submit', changeForm);

const changeInput = (e) => {
  store = {
    ...store,
    city: e.target.value
  }
  console.log(store.city);
}

const change = (e) => {
  if(e.key === 'Enter'){
    fetchData();
  }
}

city.addEventListener('input', changeInput);
city.addEventListener('keydown', change);

fetchData();


module.exports = fetchData;





