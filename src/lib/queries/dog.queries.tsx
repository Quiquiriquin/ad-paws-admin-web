import { gql } from "@apollo/client";

export const COMPANY_ALUMNI = gql`
  query CompanyDogs($companyId: Int, $search: String) {
    companyDogs(companyId: $companyId, search: $search) {
      id
      breed
      age
      name
      ownerId
      imageUrl
      notes
      owner {
        name
        lastname
        id
      }
      size
    }
  }
`;
