# Weather-forecast app

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Project installation

### `yarn install`

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches Cypress.\
See the page about [cypress](https://docs.cypress.io/) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### TODO

- Города удаляются слишком резко и не всегда понятно что произошло
- При добавленных городах навигация клавиатурой по результатам поиска требует допила - нужно перескакивать добавленне города
- На мобильных можно скрывать тултип результатов поиска сразу после добавления одного из городов (там такая механика кмк будет более приемлема)
- Не помешали бы анимации появления тултипа результатов поиска и анимация добавления/удаления городов
- Не проработан механизм актуализации структуры данных у пользователя в localstorage. Если в будущем будем резко менять структуру стора, то нужен механизм правки этой структуры у пользователей у которых уже что то есть в localstorage (нужно что то на подобие миграций?)
- Иконки погоды с openweather не очень выглядят. Может либо там же поискать что то повыразительнее, либо посмотреть в сторону других сервисов
- Можно добавить фичи - сортировка городов drag-n-drop, определение геолокации и предложение добавить города входящие в радиус координат геолокации
- Для фич нужен механизм feature-toggling-а, его пока нет
- Уже сейчас можно делать storybook с компонентами
- Тестов недостаточно. Нужно дописать тесты на логику отображения результатов поиска / прелоадера / пустых результатов, навигацию клавиатурой и тп
- Возможно, стоит и редюсеры уже тестировать, хотя пока что какой-то сложной логики в них вроде нет
- Нужно проработать механизм работы с иконками. С самими svg-файлами и сделать компонент Icon который по переданому пропсу name будет брать подходящую иконку

