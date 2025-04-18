import { faker } from '@faker-js/faker'

const createRecipe = () => {
  return {
    id: faker.string.uuid(),
    title: faker.food.dish(),
    description: faker.lorem.paragraphs(5),
    instructions: faker.food.description(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    image: `https://picsum.photos/id/${faker.helpers.rangeToNumber({
      min: 1,
      max: 100,
    })}/164`,
    isFavorite: faker.datatype.boolean(),
    dateCreated: faker.date.recent({
      days: 10,
    }),
  }
}

export const createRecipes = (num: number = 2) => {
  return [...Array(num)].map(() => createRecipe())
}
