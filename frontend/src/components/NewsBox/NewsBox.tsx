import { News } from "../../models/News";
import "./NewsBox.scss";

interface NewsProps {
    news: News[];
  }


export const NewsBox = ({news}: NewsProps) => {
    return (
      <>
        <div className="newsBox">
            {news && news.map((info) => (
                <>
                <div className="newsTile">
                    <div className="newsTitle">
                        <div>
                            <b>{info.title}</b>
                        </div>
                        <div>
                            {info.date}
                        </div>
                    </div>
                    <div className="newsContent">
                        {info.content}
                    </div>
                    <hr />
                </div>
                </>
            ))}
        </div>
      </>
    );
  };