import { useEffect, useState, useTransition } from "react";
const url = "https://jsonplaceholder.typicode.com/posts";
// type ResultType = {
//   id: number;
//   title: string;
//   body: string;
// };
const fetchData = (search?: string): any => {
  let result: any;
  let status = "initial";
  const promise = fetch(url)
    .then((res) => res.json())
    .then((data) => {
      result = data.filter((item: any) => item.title.includes(search));
      status = "success";
    })
    .catch((err) => {
      result = err;
      status = "error";
    });

  return {
    read: () => {
      if (status === "initial") {
        throw promise;
      } else if (status === "error") {
        throw result;
      } else if (status === "success") {
        return result;
      }
    },
  };
};
const initialRecourse = fetchData();
const Posts = ({ search }: string) => {
  const [s, setS] = useState(initialRecourse);
  const [isPending, startTransition] = useTransition();
  // const [data, setData] = useState([]);
  // useEffect(() => {
  //   fetch(url)
  //     .then((res) => res.json())
  //     .then((data) => setData(data.filter((item: any) => item.title.includes(search))));
  // }, [search]);
  useEffect(() => {
    startTransition(() => setS(fetchData(search)));
  }, [search]);

  return (
    <div>
      {s.read().map((item: any) => (
        <div style={{ border: "1px solid white", margin: "10px" }}>
          <h2>{item.title}</h2>
          <p>{item.body.slice(0, 20)}</p>
        </div>
      ))}
    </div>
  );
};

export default Posts;
