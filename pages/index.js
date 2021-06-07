import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'

export async function getStaticProps(context) {
  // console.log("Getting all articles")
  // console.log(process.env.ARTICLES)
  // return {
  //   props: {
  //     articles: process.env.ARTICLES || []
  //   }, // will be passed to the page component as props
  // };
  
  const glob = require("glob");
  const allArticles = glob.sync("./_articles/*.json");
  const fs = require("fs");
  const articles = allArticles.map((article) => {
    var content = fs.readFileSync(article, "utf8");
    return JSON.parse(content);
  });
  console.log(articles);
  return {
    props: {
      articles
    }
  }
}

export default function Home(props) {
  console.log(props);
  return (
    <div className="container">
      <Head>
        <title>Next.js Starter!</title>
        <link rel="icon" href="/favicon.ico" />
        <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
      </Head>

      <main>
        <Header title="Welcome to my app!" />
        <p className="description">
          Get started by editing <code>pages/index.js</code>
        </p>
        {props.articles.map((article, i) => {
          return (
            <div key={`article-${i}`}>
              <h2>{article.title}</h2>
              <p>Published {article.date}</p>
              <p>{article.previe}</p>
              <img src={article.thumbnail} />
            </div>
          );
        })}
      </main>

      <Footer />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            if (window.netlifyIdentity) {
                window.netlifyIdentity.on("init", user => {
                  if (!user) {
                    window.netlifyIdentity.on("login", () => {
                      document.location.href = "/admin/";
                    });
                  }
                });
              }
      `,
        }}
      ></script>
    </div>
  );
}
