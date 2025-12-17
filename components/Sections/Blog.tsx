import React, { useState, useEffect } from 'react';
import { ArrowRight, Calendar, ExternalLink, Loader2 } from 'lucide-react';

interface BlogPost {
  title: string;
  pubDate: string;
  link: string;
  guid: string;
  description: string;
  categories: string[];
}

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchMediumPosts = async () => {
      try {
        // We use rss2json to convert the RSS feed to JSON and bypass CORS issues in the browser
        // Updated to new username: @itsumeshp
        const response = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@itsumeshp');
        const data = await response.json();

        if (data.status === 'ok') {
          const formattedPosts = data.items.slice(0, 3).map((item: BlogPost) => {
            // Strip HTML from description to create an excerpt
            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = item.description;
            const plainText = tempDiv.textContent || tempDiv.innerText || "";
            const excerpt = plainText.substring(0, 120) + "...";

            // Calculate simple read time based on word count (avg 200 wpm)
            const wordCount = plainText.split(' ').length;
            const readTime = Math.ceil(wordCount / 200) + " min read";

            // Format Date
            const date = new Date(item.pubDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            });

            return {
              id: item.guid,
              title: item.title,
              excerpt: excerpt,
              date: date,
              readTime: readTime,
              link: item.link,
              tags: item.categories.slice(0, 2) // Take first 2 tags
            };
          });
          setPosts(formattedPosts);
        } else {
          setError(true);
        }
      } catch (err) {
        // Log as warning instead of error to avoid console noise
        console.warn("Failed to fetch Medium posts (likely adblock or network issue)");
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchMediumPosts();
  }, []);

  return (
    <section id="blog" className="py-20 bg-slate-50 dark:bg-slate-900/50 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
           <div className="mb-6 md:mb-0">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl mb-4">Latest Writings</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
              Thoughts on software architecture, Laravel best practices, and the future of web dev.
            </p>
           </div>
           <a 
             href="https://medium.com/@itsumeshp" 
             target="_blank" 
             rel="noopener noreferrer"
             className="text-primary-600 dark:text-primary-400 font-medium hover:underline flex items-center"
           >
             View Medium Profile <ExternalLink size={16} className="ml-1" />
           </a>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
             <Loader2 className="animate-spin text-primary-600" size={40} />
          </div>
        ) : error ? (
          <div className="text-center py-10 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
            <p className="text-slate-500">Could not load blog posts at the moment.</p>
            <a href="https://medium.com/@itsumeshp" target="_blank" rel="noreferrer" className="text-primary-600 hover:underline mt-2 inline-block">Visit Medium</a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <a 
                key={post.id} 
                href={post.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex flex-col h-full bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mb-4">
                  <div className="flex items-center">
                    <Calendar size={14} className="mr-1" /> {post.date}
                  </div>
                  <div className="flex items-center">
                    <span className="w-1 h-1 bg-slate-300 rounded-full mx-2"></span> {post.readTime}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-slate-600 dark:text-slate-400 mb-6 flex-1 text-sm leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex justify-between items-center mt-auto pt-4 border-t border-slate-50 dark:border-slate-700">
                  <div className="flex gap-2">
                    {post.tags.map((tag: string) => (
                      <span key={tag} className="text-xs font-medium bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 px-2.5 py-1 rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-primary-600 group-hover:text-primary-700 dark:text-primary-400 dark:group-hover:text-primary-300 flex items-center">
                    Read <ArrowRight size={16} className="ml-1 transform group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;