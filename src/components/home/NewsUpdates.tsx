import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, Tag, AlertCircle } from "lucide-react";
import newsData from "@/data/news.json";

interface NewsItem {
  id: string;
  title: string;
  category: string;
  date: string;
  author: string;
  summary: string;
  content: string;
}

export default function NewsUpdates() {
  const getCategoryImage = (category: string) => {
    switch (category.toLowerCase()) {
      case "technology":
        return "/images/dfs-technology-dashboard.png";
      case "safety & hseqe":
        return "/images/dfs-driver-safety.png";
      default:
        return "/images/dfs-cross-border-road-freight.jpg";
    }
  };

  return (
    <section className="py-20 lg:py-28 bg-light-grey">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-12">
          <div className="space-y-4">
            <span className="text-xs uppercase font-extrabold tracking-widest text-accent-gold block font-heading">
              Company Bulletin
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary-deep tracking-tight font-display">
              News & Operational Updates
            </h2>
          </div>
          
          <div className="bg-amber-50 border border-accent-gold/30 rounded-xl px-4 py-2 text-xs text-accent-deep flex items-center space-x-1.5">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            <span>Sample review content. System testing in progress.</span>
          </div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsData.map((item: NewsItem) => (
            <article
              key={item.id}
              className="bg-white border border-border-dfs rounded-2xl overflow-hidden hover:shadow-lg transition-shadow flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* News Image Header */}
                <div className="relative h-48 w-full bg-primary-light">
                  <Image
                    src={getCategoryImage(item.category)}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                  
                  {/* Category Pill Overlay */}
                  <span className="absolute bottom-3 left-3 bg-primary-deep/90 border border-accent-gold/35 text-white text-[10px] px-2.5 py-1 rounded-lg font-bold font-mono uppercase">
                    {item.category}
                  </span>
                </div>

                {/* News Content */}
                <div className="px-5 pt-1 space-y-3">
                  <div className="flex items-center space-x-3 text-xs text-grey font-mono">
                    <span className="flex items-center space-x-1">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{item.date}</span>
                    </span>
                    <span>•</span>
                    <span>By {item.author}</span>
                  </div>

                  <h3 className="text-base sm:text-lg font-extrabold text-primary-deep tracking-tight leading-snug group-hover:text-primary-royal transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-grey leading-relaxed line-clamp-3">
                    {item.summary}
                  </p>
                </div>
              </div>

              {/* Card Footer Link */}
              <div className="p-5 pt-4 mt-4 border-t border-border-dfs flex justify-between items-center bg-light-grey/20">
                <span className="text-[10px] uppercase tracking-wider text-grey/60 font-bold font-mono">
                  Operational Feed
                </span>
                
                <span className="inline-flex items-center space-x-1 text-xs font-bold text-primary-royal hover:text-accent-gold transition-colors cursor-pointer">
                  <span>Read Article</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
