import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { SidebarModule } from 'primeng/sidebar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ButtonModule } from 'primeng/button';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ListboxModule } from 'primeng/listbox';
import { MenuModule } from 'primeng/menu';
import { CardModule } from 'primeng/card';
import { StyleClassModule } from 'primeng/styleclass';
import { PanelMenuModule } from 'primeng/panelmenu';
import { DividerModule } from 'primeng/divider';
import { TimelineModule } from 'primeng/timeline';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { TooltipModule } from 'primeng/tooltip';
import { RippleModule } from 'primeng/ripple';
import { ChipModule } from 'primeng/chip';
import { CheckboxModule } from 'primeng/checkbox';
import { MegaMenuModule } from 'primeng/megamenu';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DataViewModule } from 'primeng/dataview';
import { PickListModule } from 'primeng/picklist';
import { OrderListModule } from 'primeng/orderlist';
import { DropdownModule } from 'primeng/dropdown';
import { RatingModule } from 'primeng/rating';
import { ImageModule } from 'primeng/image';
import { GalleriaModule } from 'primeng/galleria';
import { CarouselModule } from 'primeng/carousel';
import { MenubarModule } from 'primeng/menubar';
import { TabMenuModule } from 'primeng/tabmenu';
import { TableModule } from 'primeng/table';
import { TreeModule } from 'primeng/tree';
import { TreeTableModule } from 'primeng/treetable';
import { StepsModule } from 'primeng/steps';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { MultiSelectModule } from 'primeng/multiselect';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { ChipsModule } from 'primeng/chips';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { KnobModule } from 'primeng/knob';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ColorPickerModule } from 'primeng/colorpicker';
import { SplitButtonModule } from 'primeng/splitbutton';
import { SliderModule } from 'primeng/slider';
import { DialogModule } from 'primeng/dialog';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { BadgeModule } from 'primeng/badge';
import { ToolbarModule } from 'primeng/toolbar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TabViewModule } from 'primeng/tabview';
import { SpeedDialModule } from 'primeng/speeddial';
import { AccordionModule } from 'primeng/accordion';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { FieldsetModule } from 'primeng/fieldset';
import { PaginatorModule } from 'primeng/paginator';

@NgModule({
  imports: [
    CommonModule,
    MessagesModule,
    MessageModule,
    AvatarModule,
    BadgeModule,
    AvatarGroupModule,
    SidebarModule,
    RadioButtonModule,
    ButtonModule,
    InputSwitchModule,
    ListboxModule,
    MenuModule,
    CardModule,
    StyleClassModule,
    PanelMenuModule,
    DividerModule,
    TimelineModule,
    InputTextModule,
    PasswordModule,
    TooltipModule,
    RippleModule,
    ChipModule,
    CheckboxModule,
    MegaMenuModule,
    ContextMenuModule,
    DataViewModule,
    PickListModule,
    OrderListModule,
    DropdownModule,
    RatingModule,
    ImageModule,
    GalleriaModule,
    CarouselModule,
    MenubarModule,
    TabMenuModule,
    TableModule,
    TreeModule,
    TreeTableModule,
    StepsModule,
    TieredMenuModule,
    ToggleButtonModule,
    ScrollPanelModule,
    MultiSelectModule,
    ProgressBarModule,
    ToastModule,
    AutoCompleteModule,
    CalendarModule,
    ChipsModule,
    InputMaskModule,
    InputNumberModule,
    CascadeSelectModule,
    InputTextareaModule,
    KnobModule,
    SelectButtonModule,
    ColorPickerModule,
    SplitButtonModule,
    SliderModule,
    DialogModule,
    ToolbarModule,
    ProgressSpinnerModule,
    BreadcrumbModule,
    ConfirmDialogModule,
    TabViewModule,
    SpeedDialModule,
    AccordionModule,
    OverlayPanelModule,
    FieldsetModule,
    PaginatorModule,
  ],

  exports: [
    CommonModule,
    MessagesModule,
    MessageModule,
    AvatarModule,
    BadgeModule,
    AvatarGroupModule,
    SidebarModule,
    RadioButtonModule,
    ButtonModule,
    InputSwitchModule,
    ListboxModule,
    MenuModule,
    CardModule,
    StyleClassModule,
    PanelMenuModule,
    DividerModule,
    TimelineModule,
    InputTextModule,
    PasswordModule,
    TooltipModule,
    RippleModule,
    ChipModule,
    CheckboxModule,
    MegaMenuModule,
    ContextMenuModule,
    DataViewModule,
    PickListModule,
    OrderListModule,
    DropdownModule,
    RatingModule,
    ImageModule,
    GalleriaModule,
    CarouselModule,
    MenubarModule,
    TabMenuModule,
    TableModule,
    TreeModule,
    TreeTableModule,
    StepsModule,
    TieredMenuModule,
    ToggleButtonModule,
    ScrollPanelModule,
    MultiSelectModule,
    ProgressBarModule,
    ToastModule,
    AutoCompleteModule,
    CalendarModule,
    ChipsModule,
    InputMaskModule,
    InputNumberModule,
    CascadeSelectModule,
    InputTextareaModule,
    KnobModule,
    SelectButtonModule,
    ColorPickerModule,
    SplitButtonModule,
    SliderModule,
    DialogModule,
    ToolbarModule,
    ProgressSpinnerModule,
    BreadcrumbModule,
    ConfirmDialogModule,
    TabViewModule,
    SpeedDialModule,
    AccordionModule,
    OverlayPanelModule,
    FieldsetModule,
    PaginatorModule,
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    ConfirmationService,
    DialogService,
    DynamicDialogConfig,
    DynamicDialogRef,
  ],
})
export class PrimengModule {}
