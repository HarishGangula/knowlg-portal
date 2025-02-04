import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FileUploadEditorComponent } from './editors/file-upload-editor/file-upload-editor.component';
import { HomeComponent } from './home/home.component';
import { InteractivePlayerComponent } from './players/interactive-player/interactive-player.component';
import { PlayersComponent } from './players/players.component';
import { EditorsComponent } from './editors/editors.component';
import { CollectionEditorComponent } from './editors/collection-editor/collection-editor.component';
import { ContentlistComponent } from './editors/contentlist/contentlist.component';
import { InteractiveEditorComponent } from './editors/interactive-editor/interactive-editor.component';
import { RoleComponent } from './editors/role/role.component';
import { CollectionPlayerComponent } from './players/collection-player/collection-player.component';
import { PlayersListComponent } from './players/players-list/players-list.component';

const routes: Routes =  [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'editors', component: EditorsComponent,
  },
  {
    path: 'editors/content-list', component: ContentlistComponent,
  },
  {
    path: 'editors/collection-editor', component: CollectionEditorComponent,
  },
  {
    path: 'editors/file-upload-editor', component: FileUploadEditorComponent,
  },
  {
    path: 'editors/interactive-editor', component: InteractiveEditorComponent,
  },
  {
    path: 'users', component: RoleComponent,
  },
  {
    path: 'players', component: PlayersListComponent,
  },
  {
    path: 'players/interactive', component: InteractivePlayerComponent,
  },
  {
    path: 'players/collection', component: CollectionPlayerComponent,
  },
  {
    path: 'players/:mimeType/:id', component: PlayersComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
