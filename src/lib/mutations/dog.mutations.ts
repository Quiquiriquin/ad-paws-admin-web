import { gql } from "@apollo/client";

export const CREATE_DOGS = gql`
  mutation CreateDogs($input: CreateDogsInput) {
    createDogs(input: $input) {
      id
      name
      breed
      size
      color
      age
      weight
      owner {
        id
        name
        email
      }
    }
  }
`;
