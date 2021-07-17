import fs from "fs/promises";
import Link from "next/link";
import { GetStaticProps, InferGetStaticPropsType } from "next";

export default function Home({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div>
      <h1>Some plain an simple notes</h1>
      <div>
        {posts.map((p) => (
          <Link key={p} href={p}>
            <a>{p}</a>
          </Link>
        ))}
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps<{ posts: string[] }> = async () => {
  return {
    props: {
      posts: await fs
        .readdir("./pages/posts")
        .then((posts) => posts.map((p) => `/posts/${p.replace(/\.mdx$/, "")}`)),
    },
  };
};
