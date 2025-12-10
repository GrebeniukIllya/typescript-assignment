function greet(name: string, age: number, isStudent: boolean): string {
  const status: string = isStudent ? 'студент' : 'працівник';
  return `Привіт, ${name}! Тобі ${age} років і ти ${status}.`;
}

const message = greet('Світлана', 25, true);
console.log(message);
