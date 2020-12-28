import { BrowserModule, TransferState } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BlogComponent } from './components/blog/blog.component';
import { LoaderComponent } from './components/loader/loader.component';
import { ButterLinkComponent } from './components/butter-link/butter-link.component';
import { BlogCategoriesComponent } from './components/blog-categories/blog-categories.component';
import { BlogPostComponent } from './components/blog-post/blog-post.component';
import { BlogRecentComponent } from './components/blog-recent/blog-recent.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { UnsupportedBrowserComponent } from './components/unsupported-browser/unsupported-browser.component';
import { ErrorComponent } from './components/error/error.component';
import { CvComponent } from './components/cv/cv.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    BlogComponent,
    LoaderComponent,
    ButterLinkComponent,
    BlogCategoriesComponent,
    BlogPostComponent,
    BlogRecentComponent,
    PageNotFoundComponent,
    UnsupportedBrowserComponent,
    ErrorComponent,
    CvComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
  ],
  providers: [TransferState],
  bootstrap: [AppComponent],
})
export class AppModule {}
