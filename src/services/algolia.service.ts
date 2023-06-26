import algoliasearch from 'algoliasearch';
import { AlgoliaArticle } from '../types/article.interface';

type AlgoliaHits = {
    hits: AlgoliaArticle[];
};

export default class AlgoliaService {
    private static client = algoliasearch(
        process.env.REACT_APP_ALGOLIA_APP_ID || '',
        process.env.REACT_APP_ALGOLIA_API_KEY || ''
    );

    public static async search(indexName: string, query: string) {
        const index = this.client.initIndex(indexName);
        index.setSettings({
            searchableAttributes: [
                'name'
            ]
        })
        const articles: AlgoliaHits = await index.search(query, {
            hitsPerPage: 5,
        });
        return articles.hits.map((hit) => {
            return {
                objectID: hit.objectID,
                name: hit.name,
                price: hit.price,
                imageUrl: hit.imageUrl,
            }
        });
    }
}
