---@type table
local Colour = {
    Background = { Dictionary = "commonmenu", Texture = "gradient_bgd", Y = 4, Width = 415, Height = 112 },
    LeftArrow = { Dictionary = "commonmenu", Texture = "arrowleft", X = 7.5, Y = 14.44, Width = 28.89, Height = 28.89 },
    RightArrow = { Dictionary = "commonmenu", Texture = "arrowright", X = 378,75, Y = 14.44, Width = 28.89, Height = 28.89 },
    Header = { X = 215.5, Y = 14.44, Scale = 0.25 },
    Box = { X = 14.44, Y = 55, Width = 42.85, Height = 42.85 },
    SelectedRectangle = { X = 14.44, Y = 47, Width = 42.85, Height = 8 },
    Seperator = { Text = "of" }
}

---ColourPanel
---@param Title string
---@param Colours thread
---@param MinimumIndex number
---@param CurrentIndex number
---@param Callback function
---@return nil
---@public
function RageUI.ColourPanel(Title, Colours, MinimumIndex, CurrentIndex, Action, Index, Style)

    ---@type table
    local CurrentMenu = RageUI.CurrentMenu;

    if CurrentMenu ~= nil then
        if CurrentMenu() and (CurrentMenu.Index == Index) then

            ---@type number
            local Maximum = (#Colours > 9) and 9 or #Colours

            ---@type boolean
            local Hovered = RageUI.IsMouseInBounds(CurrentMenu.X + Colour.Box.X + CurrentMenu.SafeZoneSize.X + (CurrentMenu.WidthOffset / 2), CurrentMenu.Y + Colour.Box.Y + CurrentMenu.SafeZoneSize.Y + CurrentMenu.SubtitleHeight + RageUI.ItemOffset, (Colour.Box.Width * Maximum), Colour.Box.Height)

            ---@type number
            local LeftArrowHovered = RageUI.IsMouseInBounds(CurrentMenu.X + Colour.LeftArrow.X + CurrentMenu.SafeZoneSize.X + (CurrentMenu.WidthOffset / 2), CurrentMenu.Y + Colour.LeftArrow.Y + CurrentMenu.SafeZoneSize.Y + CurrentMenu.SubtitleHeight + RageUI.ItemOffset, Colour.LeftArrow.Width, Colour.LeftArrow.Height)

            ---@type number
            local RightArrowHovered = RageUI.IsMouseInBounds(CurrentMenu.X + Colour.RightArrow.X + CurrentMenu.SafeZoneSize.X + (CurrentMenu.WidthOffset / 2), CurrentMenu.Y + Colour.RightArrow.Y + CurrentMenu.SafeZoneSize.Y + CurrentMenu.SubtitleHeight + RageUI.ItemOffset, Colour.RightArrow.Width, Colour.RightArrow.Height)

            ---@type boolean
            local Selected = false

            
            --RenderRectangle(CurrentMenu.X, CurrentMenu.Y + 20 + Colour.Background.Y + CurrentMenu.SubtitleHeight + RageUI.ItemOffset, Colour.Background.Width + CurrentMenu.WidthOffset, Colour.Background.Height, 16, 16, 16, 255)

            RenderSprite(Colour.LeftArrow.Dictionary, Colour.LeftArrow.Texture, CurrentMenu.X + Colour.LeftArrow.X + (CurrentMenu.WidthOffset / 2), 15 + CurrentMenu.Y + Colour.LeftArrow.Y + CurrentMenu.SubtitleHeight + RageUI.ItemOffset, Colour.LeftArrow.Width, Colour.LeftArrow.Height)
            RenderSprite(Colour.RightArrow.Dictionary, Colour.RightArrow.Texture, CurrentMenu.X + Colour.RightArrow.X + (CurrentMenu.WidthOffset / 2), 15 + CurrentMenu.Y + Colour.RightArrow.Y + CurrentMenu.SubtitleHeight + RageUI.ItemOffset, Colour.RightArrow.Width, Colour.RightArrow.Height)

            RenderRectangle(CurrentMenu.X + Colour.SelectedRectangle.X + (Colour.Box.Width * (CurrentIndex - MinimumIndex)) + (CurrentMenu.WidthOffset / 2), 15 + CurrentMenu.Y + Colour.SelectedRectangle.Y + CurrentMenu.SubtitleHeight + RageUI.ItemOffset, Colour.SelectedRectangle.Width, Colour.SelectedRectangle.Height, 36, 95, 203, 215)

            for Index = 1, Maximum do
                RenderRectangle(CurrentMenu.X + Colour.Box.X + (Colour.Box.Width * (Index - 1)) + (CurrentMenu.WidthOffset / 2), 15 + CurrentMenu.Y + Colour.Box.Y + CurrentMenu.SubtitleHeight + RageUI.ItemOffset, Colour.Box.Width, Colour.Box.Height, table.unpack(Colours[MinimumIndex + Index - 1]))
            end
            
            local ColourSeperator = {}
            if type(Style) == "table" then
                if type(Style.Seperator) == "table" then
                    ColourSeperator = Style.Seperator
                else
                    ColourSeperator = Colour.Seperator
                end
            else
                ColourSeperator = Colour.Seperator
            end
            
            RenderText((Title and Title or "") .. " (" .. CurrentIndex .. " " .. ColourSeperator.Text .. " " .. #Colours .. ")", CurrentMenu.X + RageUI.Settings.Panels.Grid.Text.Top.X + (CurrentMenu.WidthOffset / 2), 17.5 + CurrentMenu.Y + RageUI.Settings.Panels.Grid.Text.Top.Y + CurrentMenu.SubtitleHeight + RageUI.ItemOffset, 0, 0.25, 245, 245, 245, 255, 1)

            if Hovered or LeftArrowHovered or RightArrowHovered then
                if RageUI.Settings.Controls.Click.Active then
                    Selected = true

                    if LeftArrowHovered then
                        CurrentIndex = CurrentIndex - 1

                        if CurrentIndex < 1 then
                            CurrentIndex = #Colours
                            MinimumIndex = #Colours - Maximum + 1
                        elseif CurrentIndex < MinimumIndex then
                            MinimumIndex = MinimumIndex - 1
                        end
                    elseif RightArrowHovered then
                        CurrentIndex = CurrentIndex + 1

                        if CurrentIndex > #Colours then
                            CurrentIndex = 1
                            MinimumIndex = 1
                        elseif CurrentIndex > MinimumIndex + Maximum - 1 then
                            MinimumIndex = MinimumIndex + 1
                        end
                    elseif Hovered then
                        for Index = 1, Maximum do
                            if RageUI.IsMouseInBounds(CurrentMenu.X + Colour.Box.X + (Colour.Box.Width * (Index - 1)) + CurrentMenu.SafeZoneSize.X + (CurrentMenu.WidthOffset / 2), CurrentMenu.Y + Colour.Box.Y + CurrentMenu.SafeZoneSize.Y + CurrentMenu.SubtitleHeight + RageUI.ItemOffset, Colour.Box.Width, Colour.Box.Height) then
                                CurrentIndex = MinimumIndex + Index - 1
                            end
                        end
                    end

                    if (Action.onColorChange ~= nil) then
                        Action.onColorChange(MinimumIndex, CurrentIndex)
                    end
                end
            end

            RageUI.ItemOffset = RageUI.ItemOffset + Colour.Background.Height + Colour.Background.Y

            if (Hovered or LeftArrowHovered or RightArrowHovered) and RageUI.Settings.Controls.Click.Active then
                local Audio = RageUI.Settings.Audio
                RageUI.PlaySound(Audio[Audio.Use].Select.audioName, Audio[Audio.Use].Select.audioRef)
            end
        end
    end
end


