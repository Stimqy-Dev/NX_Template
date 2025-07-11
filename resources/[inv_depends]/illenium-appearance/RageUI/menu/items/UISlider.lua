---@type table
local SettingsButton = {
    Rectangle = { Y = 0, Width = 431, Height = 47 },
    Text = { X = 8, Y = 28, Scale = 0.25 },
    LeftBadge = { Y = -2, Width = 40, Height = 40 },
    RightBadge = { X = 385, Y = -2, Width = 40, Height = 40 },
    RightText = { X = 420, Y = 4, Scale = 0.35 },
    SelectedSprite = { Dictionary = "commonmenu", Texture = "gradient_nav", Y = 0, Width = 431, Height = 38 },
}

---@type table
local SettingsSlider = {
    Background = { X = 250, Y = 14.5, Width = 150, Height = 9 },
    Slider = { X = 200, Y = 34.5, Width = 75, Height = 9 },
    Divider = { X = 273.5, Y = 29, Width = 2.5, Height = 20 },
    LeftArrow = { Dictionary = "commonmenu", Texture = "arrowleft", X = 180, Y = 31, Width = 15, Height = 15 },
    RightArrow = { Dictionary = "commonmenu", Texture = "arrowright", X = 350, Y = 31, Width = 15, Height = 15 },
}



function RageUI.Slider(Label, ProgressStart, ProgressMax, Description, Divider, Style, Enabled, Actions)
    ---@type table
    local CurrentMenu = RageUI.CurrentMenu;
    local Audio = RageUI.Settings.Audio
    if CurrentMenu ~= nil then
        if CurrentMenu() then
            local Items = {}
            for i = 1, ProgressMax do
                table.insert(Items, i)
            end
            ---@type number
            local Option = RageUI.Options + 1

            if CurrentMenu.Pagination.Minimum <= Option and CurrentMenu.Pagination.Maximum >= Option then
                ---@type number
                local Selected = CurrentMenu.Index == Option

                ---@type boolean
                local LeftArrowHovered, RightArrowHovered = false, false

                RageUI.ItemsSafeZone(CurrentMenu)

                local Hovered = false;
                local LeftBadgeOffset = ((Style.LeftBadge == RageUI.BadgeStyle.None or Style.LeftBadge == nil) and 0 or 27)
                local RightBadgeOffset = ((Style.RightBadge == RageUI.BadgeStyle.None or Style.RightBadge == nil) and 0 or 32)
                local RightOffset = 0
                ---@type boolean

                if CurrentMenu.EnableMouse == true and (CurrentMenu.CursorStyle == 0) or (CurrentMenu.CursorStyle == 1) then
                    Hovered = RageUI.ItemsMouseBounds(CurrentMenu, Selected, Option, SettingsButton);
                end

                if not Active then
                    -- RenderRectangle(CurrentMenu.X + 28,
                    --     CurrentMenu.Y + 20 + SettingsButton.SelectedSprite.Y + CurrentMenu.SubtitleHeight +
                    --     RageUI.ItemOffset, SettingsButton.SelectedSprite.Width + CurrentMenu.WidthOffset - 55,
                    --     SettingsButton.SelectedSprite.Height - 1, 16, 16, 16, 255)
                    RenderSprite("commonmenu", "bouton", CurrentMenu.X + 28,
                        CurrentMenu.Y + 20 + SettingsButton.SelectedSprite.Y + CurrentMenu.SubtitleHeight +
                        RageUI.ItemOffset, SettingsButton.SelectedSprite.Width + CurrentMenu.WidthOffset - 55,
                        SettingsButton.SelectedSprite.Height - 1, 0, 16, 16, 16, 150)
                end

                if Selected then
                    -- RenderRectangle(CurrentMenu.X + 28,
                    --     CurrentMenu.Y + 20 + SettingsButton.SelectedSprite.Y + CurrentMenu.SubtitleHeight +
                    --     RageUI.ItemOffset, SettingsButton.SelectedSprite.Width + CurrentMenu.WidthOffset - 55,
                    --     SettingsButton.SelectedSprite.Height - 1, 36, 95, 203, 215)
                    RenderSprite("commonmenu", "bouton", CurrentMenu.X + 28,
                        CurrentMenu.Y + 20 + SettingsButton.SelectedSprite.Y + CurrentMenu.SubtitleHeight +
                        RageUI.ItemOffset, SettingsButton.SelectedSprite.Width + CurrentMenu.WidthOffset - 55,
                        SettingsButton.SelectedSprite.Height - 1, 0, NX.RAGEUI_RGBA.r, NX.RAGEUI_RGBA.g, NX.RAGEUI_RGBA.b, NX.RAGEUI_RGBA.a)
                end

                if Selected then
                    LeftArrowHovered = RageUI.IsMouseInBounds(
                        CurrentMenu.X + SettingsSlider.LeftArrow.X + CurrentMenu.SafeZoneSize.X + CurrentMenu
                        .WidthOffset,
                        CurrentMenu.Y + SettingsSlider.LeftArrow.Y + CurrentMenu.SafeZoneSize.Y +
                        CurrentMenu.SubtitleHeight + RageUI.ItemOffset, SettingsSlider.LeftArrow.Width,
                        SettingsSlider.LeftArrow.Height)
                    RightArrowHovered = RageUI.IsMouseInBounds(
                        CurrentMenu.X + SettingsSlider.RightArrow.X + CurrentMenu.SafeZoneSize.X +
                        CurrentMenu.WidthOffset,
                        CurrentMenu.Y + SettingsSlider.RightArrow.Y + CurrentMenu.SafeZoneSize.Y +
                        CurrentMenu.SubtitleHeight + RageUI.ItemOffset, SettingsSlider.RightArrow.Width,
                        SettingsSlider.RightArrow.Height)
                end

                if Enabled == true or Enabled == nil then
                    if Selected then
                        if Style.RightLabel ~= nil and Style.RightLabel ~= "" then
                            RenderText(Style.RightLabel,
                                CurrentMenu.X + SettingsButton.RightText.X - RightBadgeOffset + CurrentMenu.WidthOffset,
                                CurrentMenu.Y + SettingsButton.RightText.Y + CurrentMenu.SubtitleHeight +
                                RageUI.ItemOffset, 0, SettingsButton.RightText.Scale, 255, 255, 255, 255, 2)
                            RightOffset = MeasureStringWidth(Style.RightLabel, 0, 0.35)
                        end
                    else
                        if Style.RightLabel ~= nil and Style.RightLabel ~= "" then
                            RightOffset = MeasureStringWidth(Style.RightLabel, 0, 0.35)
                            RenderText(Style.RightLabel,
                                CurrentMenu.X + SettingsButton.RightText.X - RightBadgeOffset + CurrentMenu.WidthOffset,
                                CurrentMenu.Y + SettingsButton.RightText.Y + CurrentMenu.SubtitleHeight +
                                RageUI.ItemOffset, 0, SettingsButton.RightText.Scale, 245, 245, 245, 255, 2)
                        end
                    end
                end

                RightOffset = RightOffset + RightBadgeOffset
                if Enabled == true or Enabled == nil then
                    if Selected then
                        RenderText(Label, 28 + CurrentMenu.X + SettingsButton.Text.X + LeftBadgeOffset,
                            CurrentMenu.Y + SettingsButton.Text.Y + CurrentMenu.SubtitleHeight + RageUI.ItemOffset, 0,
                            SettingsButton.Text.Scale, 255, 255, 255, 255)

                        RenderSprite(SettingsSlider.LeftArrow.Dictionary, SettingsSlider.LeftArrow.Texture,
                            28 + CurrentMenu.X + SettingsSlider.LeftArrow.X + CurrentMenu.WidthOffset - RightOffset,
                            CurrentMenu.Y + SettingsSlider.LeftArrow.Y + CurrentMenu.SubtitleHeight + RageUI.ItemOffset,
                            SettingsSlider.LeftArrow.Width, SettingsSlider.LeftArrow.Height, 0, 255, 255, 255, 255)
                        RenderSprite(SettingsSlider.RightArrow.Dictionary, SettingsSlider.RightArrow.Texture,
                            28 + CurrentMenu.X + SettingsSlider.RightArrow.X + CurrentMenu.WidthOffset - RightOffset,
                            CurrentMenu.Y + SettingsSlider.RightArrow.Y + CurrentMenu.SubtitleHeight + RageUI.ItemOffset,
                            SettingsSlider.RightArrow.Width, SettingsSlider.RightArrow.Height, 0, 255, 255, 255, 255)
                    else
                        RenderText(Label, 28 + CurrentMenu.X + SettingsButton.Text.X + LeftBadgeOffset,
                            CurrentMenu.Y + SettingsButton.Text.Y + CurrentMenu.SubtitleHeight + RageUI.ItemOffset, 0,
                            SettingsButton.Text.Scale, 100, 100, 100, 255)
                    end
                else
                    RenderText(Label, 28 + CurrentMenu.X + SettingsButton.Text.X + LeftBadgeOffset,
                        CurrentMenu.Y + SettingsButton.Text.Y + CurrentMenu.SubtitleHeight + RageUI.ItemOffset, 0,
                        SettingsButton.Text.Scale, 163, 159, 148, 255)

                    if Selected then
                        RenderSprite(SettingsSlider.LeftArrow.Dictionary, SettingsSlider.LeftArrow.Texture,
                            28 + CurrentMenu.X + SettingsSlider.LeftArrow.X + CurrentMenu.WidthOffset - RightOffset,
                            CurrentMenu.Y + SettingsSlider.LeftArrow.Y + CurrentMenu.SubtitleHeight + RageUI.ItemOffset,
                            SettingsSlider.LeftArrow.Width, SettingsSlider.LeftArrow.Height, 163, 159, 148, 255)
                        RenderSprite(SettingsSlider.RightArrow.Dictionary, SettingsSlider.RightArrow.Texture,
                            28 + CurrentMenu.X + SettingsSlider.RightArrow.X + CurrentMenu.WidthOffset - RightOffset,
                            CurrentMenu.Y + SettingsSlider.RightArrow.Y + CurrentMenu.SubtitleHeight + RageUI.ItemOffset,
                            SettingsSlider.RightArrow.Width, SettingsSlider.RightArrow.Height, 163, 159, 148, 255)
                    end
                end

                if type(Style) == "table" then
                    if Style.Enabled == true or Style.Enabled == nil then
                        if type(Style) == 'table' then
                            if Style.LeftBadge ~= nil then
                                if Style.LeftBadge ~= RageUI.BadgeStyle.None then
                                    local BadgeData = Style.LeftBadge(Selected)

                                    RenderSprite(BadgeData.BadgeDictionary or "commonmenu", BadgeData.BadgeTexture or "",
                                        28 + CurrentMenu.X,
                                        CurrentMenu.Y + SettingsButton.LeftBadge.Y + CurrentMenu.SubtitleHeight +
                                        RageUI.ItemOffset, SettingsButton.LeftBadge.Width,
                                        SettingsButton.LeftBadge.Height, 0,
                                        BadgeData.BadgeColour and BadgeData.BadgeColour.R or 255,
                                        BadgeData.BadgeColour and BadgeData.BadgeColour.G or 255,
                                        BadgeData.BadgeColour and BadgeData.BadgeColour.B or 255,
                                        BadgeData.BadgeColour and BadgeData.BadgeColour.A or 255)
                                end
                            end

                            if Style.RightBadge ~= nil then
                                if Style.RightBadge ~= RageUI.BadgeStyle.None then
                                    local BadgeData = Style.RightBadge(Selected)

                                    RenderSprite(BadgeData.BadgeDictionary or "commonmenu", BadgeData.BadgeTexture or "",
                                        28 + CurrentMenu.X + SettingsButton.RightBadge.X + CurrentMenu.WidthOffset,
                                        CurrentMenu.Y + SettingsButton.RightBadge.Y + CurrentMenu.SubtitleHeight +
                                        RageUI.ItemOffset, SettingsButton.RightBadge.Width,
                                        SettingsButton.RightBadge.Height, 0,
                                        BadgeData.BadgeColour and BadgeData.BadgeColour.R or 255,
                                        BadgeData.BadgeColour and BadgeData.BadgeColour.G or 255,
                                        BadgeData.BadgeColour and BadgeData.BadgeColour.B or 255,
                                        BadgeData.BadgeColour and BadgeData.BadgeColour.A or 255)
                                end
                            end
                        end
                    else
                        ---@type table
                        local LeftBadge = RageUI.BadgeStyle.Lock

                        if LeftBadge ~= RageUI.BadgeStyle.None and LeftBadge ~= nil then
                            local BadgeData = LeftBadge(Selected)

                            RenderSprite(BadgeData.BadgeDictionary or "commonmenu", BadgeData.BadgeTexture or "",
                                28 + CurrentMenu.X,
                                CurrentMenu.Y + SettingsButton.LeftBadge.Y + CurrentMenu.SubtitleHeight +
                                RageUI.ItemOffset, SettingsButton.LeftBadge.Width, SettingsButton.LeftBadge.Height, 0,
                                BadgeData.BadgeColour.R or 255, BadgeData.BadgeColour.G or 255,
                                BadgeData.BadgeColour.B or 255, BadgeData.BadgeColour.A or 255)
                        end
                    end
                else
                    error("UICheckBox Style is not a `table`")
                end

                RenderRectangle(
                    28 + CurrentMenu.X + SettingsSlider.Slider.X +
                    (((SettingsSlider.Background.Width - SettingsSlider.Slider.Width) / (#Items - 1)) * (ProgressStart - 1)) +
                    CurrentMenu.WidthOffset - RightOffset,
                    CurrentMenu.Y + SettingsSlider.Slider.Y + CurrentMenu.SubtitleHeight + RageUI.ItemOffset,
                    SettingsSlider.Slider.Width, SettingsSlider.Slider.Height, 133, 133, 133, 255)
                if Divider then
                    RenderRectangle(28 + CurrentMenu.X + SettingsSlider.Divider.X + CurrentMenu.WidthOffset,
                        CurrentMenu.Y + SettingsSlider.Divider.Y + CurrentMenu.SubtitleHeight + RageUI.ItemOffset,
                        SettingsSlider.Divider.Width, SettingsSlider.Divider.Height, 245, 245, 245, 255)
                end

                RageUI.ItemOffset = RageUI.ItemOffset + SettingsButton.Rectangle.Height

                RageUI.ItemsDescription(CurrentMenu, Description, Selected);

                if Selected and (CurrentMenu.Controls.Left.Active or (CurrentMenu.Controls.Click.Active and LeftArrowHovered)) and not (CurrentMenu.Controls.Right.Active or (CurrentMenu.Controls.Click.Active and RightArrowHovered)) then
                    ProgressStart = ProgressStart - 1
                    if ProgressStart < 1 then
                        ProgressStart = #Items
                    end
                    if (Actions.onSliderChange ~= nil) then
                        Actions.onSliderChange(ProgressStart);
                    end
                    RageUI.PlaySound(Audio[Audio.Use].LeftRight.audioName, Audio[Audio.Use].LeftRight.audioRef)
                elseif Selected and (CurrentMenu.Controls.Right.Active or (CurrentMenu.Controls.Click.Active and RightArrowHovered)) and not (CurrentMenu.Controls.Left.Active or (CurrentMenu.Controls.Click.Active and LeftArrowHovered)) then
                    ProgressStart = ProgressStart + 1
                    if ProgressStart > #Items then
                        ProgressStart = 1
                    end
                    if (Actions.onSliderChange ~= nil) then
                        Actions.onSliderChange(ProgressStart);
                    end
                    RageUI.PlaySound(Audio[Audio.Use].LeftRight.audioName, Audio[Audio.Use].LeftRight.audioRef)
                end

                if Selected and (CurrentMenu.Controls.Select.Active or ((Hovered and CurrentMenu.Controls.Click.Active) and (not LeftArrowHovered and not RightArrowHovered))) then
                    if (Actions.onSelected ~= nil) then
                        Actions.onSelected(ProgressStart);
                    end
                    RageUI.PlaySound(Audio[Audio.Use].Select.audioName, Audio[Audio.Use].Select.audioRef)
                elseif Selected then
                    if (Actions.onActive ~= nil) then
                        Actions.onActive()
                    end
                end
            end

            RageUI.Options = RageUI.Options + 1
        end
    end
end
