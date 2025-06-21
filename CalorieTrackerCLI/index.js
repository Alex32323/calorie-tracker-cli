const fs = require('fs');
const FILE = 'data.json';

// Добавление продукта
function addFood(name, calories) {
  const data = loadData();
  data.push({ name, calories, date: new Date().toLocaleDateString() });
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
  console.log(`✅ "${name}" (${calories} ккал) добавлено!`);
}

// Сумма калорий за день
function getTotal() {
  const today = new Date().toLocaleDateString();
  const total = loadData()
    .filter(entry => entry.date === today)
    .reduce((sum, item) => sum + item.calories, 0);
  console.log(`📊 Сегодня: ${total} ккал`);
}

// Загрузка данных
function loadData() {
  try {
    return JSON.parse(fs.readFileSync(FILE));
  } catch {
    return [];
  }
}

// Парсинг аргументов командной строки
const [command, arg1, arg2] = process.argv.slice(2);
switch (command) {
  case 'add':
    addFood(arg1, parseInt(arg2));
    break;
  case 'total':
    getTotal();
    break;
  default:
    console.log('❌ Неизвестная команда. Используйте: add <продукт> <калории> или total');
}