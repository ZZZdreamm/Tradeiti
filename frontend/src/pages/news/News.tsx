import { withPrivateRoute } from "../../common/withPrivateRoute/WithPrivateRoute";

import { NewsBox } from "../../components/NewsBox/NewsBox";
import { MockedNews } from "../../mocks/MockedNews";

export const News = () => {
  return (
    <div>
      <h1>News</h1>
      <NewsBox news={MockedNews}/>
    </div>
  );
};

export const PrivateNews = withPrivateRoute(News);
