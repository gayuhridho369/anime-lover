import { gql } from "@apollo/client";

export const GetAnimes = gql`
  query Query($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        perPage
        currentPage
      }
      media(type: ANIME) {
        id
        title {
          english
          native
        }
        coverImage {
          large
        }
        averageScore
        episodes
      }
    }
  }
`;

export default GetAnimes;
