import { faker } from '@faker-js/faker'

const createRecipe = () => {
  return {
    id: faker.string.uuid(),
    title: faker.food.dish(),
    description: faker.lorem.paragraphs(5),
    author: faker.person.firstName(),
    image: `https://picsum.photos/id/${faker.helpers.rangeToNumber({
      min: 1,
      max: 100,
    })}/200`,
    isFavorite: faker.datatype.boolean(),
    dateCreated: faker.date.recent(),
  }
}

export const createRecipes = (num: number = 2) => {
  return [...Array(num)].map(() => createRecipe())
}
