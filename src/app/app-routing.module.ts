import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogPostComponent } from './components/blog-post/blog-post.component';
import { BlogComponent } from './components/blog/blog.component';
import { CvComponent } from './components/cv/cv.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { BlogListResolver } from './resolvers/blog-list.resolver';
import { BlogPostResolver } from './resolvers/blog-post.resolver';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'blog',
    component: BlogComponent,
    resolve: {
      blogList: BlogListResolver,
    },
  },
  {
    path: 'category/:category',
    component: BlogComponent,
    resolve: {
      blogList: BlogListResolver,
    },
  },
  {
    path: 'blog/:slug',
    component: BlogPostComponent,
    resolve: {
      blogPost: BlogPostResolver,
    },
  },
  {
    path: 'cv',
    component: CvComponent,
  },
  {
    path: 'page-not-found',
    component: PageNotFoundComponent,
  },
  { path: '**', redirectTo: '/page-not-found' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
