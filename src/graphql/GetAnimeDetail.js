import { gql } from "@apollo/client";

const getAnimeDetail = gql`
  query Query($id: Int) {
    Media(id: $id, type: ANIME) {
      id
      title {
        english
        native
      }
      coverImage {
        large
      }
      bannerImage
      averageScore
      genres
      episodes
      description
    }
  }
`;

export default getAnimeDetail;
